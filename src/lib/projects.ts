import path from "node:path";

import { RelativePattern, Uri, workspace } from "vscode";

import { patternExclude, patternPackage, patternWebC } from "../constants.js";

let projects: Project[] = [];

class Project {
	#uri: Uri;
	#components: Map<string, Uri> | null = null;

	constructor(root: Uri) {
		this.#uri = Uri.joinPath(root, "..");
	}

	async init() {
		const filePattern = new RelativePattern(this.#uri, patternWebC);
		const files = await workspace.findFiles(filePattern, patternExclude);

		this.#components = new Map();

		for (const file of files) {
			const name = path.basename(file.path, path.extname(file.path));
			this.#components.set(name, file);
		}
	}

	has(file: Uri) {
		return file.path.startsWith(this.#uri.path);
	}

	getComponent(name: string) {
		return this.#components?.get(name);
	}
}

export async function loadProjects() {
	const pkgs = await workspace.findFiles(patternPackage, patternExclude);

	// Fall back to workspace folders as project roots if no package.json files could be found
	if (!pkgs.length && workspace.workspaceFolders) {
		pkgs.push(...workspace.workspaceFolders.map((folder) => folder.uri));
	}

	projects = [];

	for (const pkg of pkgs) {
		const project = new Project(pkg);
		await project.init();
		projects.push(project);
	}
}

export async function reloadProjects() {
	for (const project of projects) {
		await project.init();
	}
}

export function getProject(file: Uri) {
	return projects.find((project) => project.has(file));
}
