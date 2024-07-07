import path from "node:path";

import vscode from "vscode";

import {
	eleventyConfigPattern,
	excludePattern,
	webcFilePattern,
} from "../constants.js";

let projects: Project[] = [];

class Project {
	#path: string;

	components: Map<string, vscode.Uri> | null = null;
	componentsPattern: RegExp | null = null;

	constructor(config: vscode.Uri) {
		this.#path = path.dirname(config.path);
	}

	async init() {
		const filePattern = new vscode.RelativePattern(this.#path, webcFilePattern);
		const files = await vscode.workspace.findFiles(filePattern, excludePattern);

		this.components = new Map();

		for (const file of files) {
			const name = path.basename(file.path, path.extname(file.path));
			this.components.set(name, file);
		}

		const componentNames = [...this.components.keys()];
		this.componentsPattern = new RegExp(
			`</?(${componentNames.join("|")})[>\\s]`,
			"g",
		);
	}

	has(uri: vscode.Uri) {
		return uri.path.startsWith(this.#path);
	}

	getComponentPath(name: string) {
		return this.components?.get(name);
	}
}

export async function loadEleventyProjects() {
	const configURIs = await vscode.workspace.findFiles(
		eleventyConfigPattern,
		excludePattern,
	);

	projects = [];

	for (const config of configURIs) {
		const project = new Project(config);
		await project.init();
		projects.push(project);
	}
}

export async function reloadEleventyProjects() {
	for (const project of projects) {
		await project.init();
	}
}

export function getEleventyProject(uri: vscode.Uri) {
	return projects.find((project) => project.has(uri));
}
