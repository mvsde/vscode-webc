import {
	type DocumentSemanticTokensProvider,
	languages,
	Range,
	SemanticTokensBuilder,
	SemanticTokensLegend,
} from "vscode";

import { documentSelectorWebC, frontMatterDelimiter, keywordAttributes } from "../constants.js";
import { getProject } from "../lib/projects.js";

interface TokenPosition {
	range: Range;
	tokenType: string;
}

const tokenTypes = ["class", "keyword"];
const legend = new SemanticTokensLegend(tokenTypes);

const provider: DocumentSemanticTokensProvider = {
	provideDocumentSemanticTokens(document, token) {
		const project = getProject(document.uri);

		if (!project) return;

		const builder = new SemanticTokensBuilder(legend);
		const text = document.getText();
		const positions: TokenPosition[] = [];

		let index = 0;

		// Skip front matter
		index = skip({ text, index, start: frontMatterDelimiter, end: frontMatterDelimiter });

		for (index; index < text.length; index++) {
			if (token.isCancellationRequested) break;

			// Skip tags
			index = skip({ text, index, start: "<style", end: "</style>" });
			index = skip({ text, index, start: "<script", end: "</script>" });

			// Elements
			if (text[index] === "<") {
				const offset = text[index + 1] === "/" ? 2 : 1;
				const position = document.positionAt(index + offset);
				const range = document.getWordRangeAtPosition(position);

				if (!range) continue;

				const name = document.getText(range);
				const component = project.getComponent(name);

				if (!component) continue;

				positions.push({ range, tokenType: "class" });

				index = index + name.length;
			}

			// Attributes
			if (text.startsWith("webc:", index)) {
				const attribute = keywordAttributes.find((value) => text.startsWith(value, index));

				if (!attribute) continue;

				const start = document.positionAt(index);
				const end = start.translate(0, attribute.length);
				const range = new Range(start, end);

				positions.push({ range, tokenType: "keyword" });

				index = index + attribute.length;
			}
		}

		for (const { range, tokenType } of positions) {
			builder.push(range, tokenType);
		}

		return builder.build();
	},
};

export const semanticTokenProvider = languages.registerDocumentSemanticTokensProvider(
	documentSelectorWebC,
	provider,
	legend,
);

interface SkipOptions {
	text: string;
	index: number;
	start: string;
	end: string;
}

function skip({ text, index, start, end }: SkipOptions): number {
	if (!text.startsWith(start, index)) {
		return index;
	}

	const length = end.length;
	const endIndex = text.indexOf(end, index + length) + length;

	return endIndex;
}
