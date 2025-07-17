import { type DefinitionProvider, languages, Location, Position } from "vscode";

import { documentSelectorWebC } from "../constants.js";
import { getProject } from "../lib/projects.js";

const provider: DefinitionProvider = {
	provideDefinition(document, position) {
		const project = getProject(document.uri);

		if (!project) return;

		const range = document.getWordRangeAtPosition(position);

		if (!range) return;

		const name = document.getText(range);
		const component = project.getComponent(name);

		if (!component) return;

		const definitionPosition = new Position(0, 0);
		const definitionLocation = new Location(component, definitionPosition);

		return definitionLocation;
	},
};

export const definitionProvider = languages.registerDefinitionProvider(documentSelectorWebC, provider);
