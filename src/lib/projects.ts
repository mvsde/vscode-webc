import path from "node:path";

import vscode from "vscode";

import { patternEleventyConfig, patternExclude, patternWebC } from "../constants.js";

let projects: Project[] = [];

class Project {
	#uri: vscode.Uri;
	#components: Map<string, vscode.Uri> | null = null;

	constructor(config: vscode.Uri) {
		this.#uri = vscode.Uri.joinPath(config, "..");
	}

	async init() {
		const filePattern = new vscode.RelativePattern(this.#uri, patternWebC);
		const files = await vscode.workspace.findFiles(filePattern, patternExclude);

		this.#components = new Map();

		for (const file of files) {
			const name = path.basename(file.path, path.extname(file.path));
			this.#components.set(name, file);
		}
	}

	has(file: vscode.Uri) {
		return file.path.startsWith(this.#uri.path);
	}

	getComponent(name: string) {
		return this.#components?.get(name);
	}
}

export async function loadProjects() {
	const configs = await vscode.workspace.findFiles(patternEleventyConfig, patternExclude);

	projects = [];

	for (const config of configs) {
		const project = new Project(config);
		await project.init();
		projects.push(project);
	}
}

export async function reloadProjects() {
	for (const project of projects) {
		await project.init();
	}
}

export function getProject(file: vscode.Uri) {
	return projects.find((project) => project.has(file));
}
