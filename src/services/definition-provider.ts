import vscode from "vscode";

import { documentSelectorWebC } from "../constants.js";
import { getProject } from "../lib/projects.js";

const provider: vscode.DefinitionProvider = {
	provideDefinition(document, position) {
		const project = getProject(document.uri);

		if (!project) return;

		const range = document.getWordRangeAtPosition(position);

		if (!range) return;

		const name = document.getText(range);
		const component = project.getComponent(name);

		if (!component) return;

		const definitionPosition = new vscode.Position(0, 0);
		const definitionLocation = new vscode.Location(component, definitionPosition);

		return definitionLocation;
	},
};

export const definitionProvider = vscode.languages.registerDefinitionProvider(documentSelectorWebC, provider);
