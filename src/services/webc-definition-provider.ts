import vscode from "vscode";

import { patternWebC } from "../constants.js";
import { getProject } from "../lib/projects.js";

export const WebCDocumentSelector: vscode.DocumentFilter = {
	language: "html",
	pattern: patternWebC,
};

export const WebCDefinitionProvider: vscode.DefinitionProvider = {
	provideDefinition(document, position) {
		const project = getProject(document.uri);

		if (!project) {
			return;
		}

		const range = document.getWordRangeAtPosition(position);
		const name = document.getText(range);
		const component = project.getComponent(name);

		if (!component) {
			return;
		}

		const definitionPosition = new vscode.Position(0, 0);
		const definitionLocation = new vscode.Location(component, definitionPosition);

		return definitionLocation;
	},
};
