import vscode from "vscode";

import { documentSelectorWebC, patternWebC } from "./constants.js";
import { createFileSystemWatcher } from "./lib/file-system-watcher.js";
import { loadProjects, reloadProjects } from "./lib/projects.js";
import { definitionProvider } from "./services/definition-provider.js";

export async function activate(context: vscode.ExtensionContext) {
	await loadProjects();

	context.subscriptions.push(
		vscode.workspace.onDidChangeWorkspaceFolders(loadProjects),
		createFileSystemWatcher(patternWebC, reloadProjects),
		vscode.languages.registerDefinitionProvider(documentSelectorWebC, definitionProvider),
	);
}
