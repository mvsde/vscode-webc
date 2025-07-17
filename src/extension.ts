import { type ExtensionContext, workspace } from "vscode";

import { patternWebC } from "./constants.js";
import { createFileSystemWatcher } from "./lib/file-system-watcher.js";
import { loadProjects, reloadProjects } from "./lib/projects.js";
import { definitionProvider } from "./services/definition-provider.js";
import { semanticTokenProvider } from "./services/semantic-token-provider.js";

export async function activate(context: ExtensionContext) {
	await loadProjects();

	context.subscriptions.push(
		workspace.onDidChangeWorkspaceFolders(loadProjects),
		createFileSystemWatcher(patternWebC, reloadProjects),
		definitionProvider,
		semanticTokenProvider,
	);
}
