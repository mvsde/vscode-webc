import vscode from "vscode";

import { webcFilePattern } from "../constants.js";
import { getEleventyProject } from "./eleventy.js";

const selector: vscode.DocumentSelector = { pattern: webcFilePattern };

function provideDocumentLinks(
	document: vscode.TextDocument,
	token: vscode.CancellationToken,
) {
	const eleventyProject = getEleventyProject(document.uri);
	const content = document.getText();

	if (!eleventyProject) {
		return;
	}

	if (!eleventyProject.componentsPattern) {
		return;
	}

	if (!content.trim()) {
		return;
	}

	const links: vscode.DocumentLink[] = [];
	const matches = content.matchAll(eleventyProject.componentsPattern);

	for (const match of matches) {
		if (token.isCancellationRequested) {
			break;
		}

		const componentName = match[1];
		const componentPath = eleventyProject.getComponentPath(componentName);

		const contentStart = match.index + match[0].indexOf(componentName);
		const contentEnd = contentStart + componentName.length;

		const range = new vscode.Range(
			document.positionAt(contentStart),
			document.positionAt(contentEnd),
		);

		links.push({ range, target: componentPath });
	}

	return links;
}

const provider: vscode.DocumentLinkProvider = { provideDocumentLinks };

export function documentLinks() {
	return vscode.languages.registerDocumentLinkProvider(selector, provider);
}
