import vscode from "vscode";

import { getProject } from "../lib/projects.js";

export const definitionProvider: vscode.DefinitionProvider = {
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
