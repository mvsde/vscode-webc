import vscode from "vscode";

import { webcFilePattern } from "./constants.js";
import { documentLinks } from "./lib/document-links.js";
import {
	loadEleventyProjects,
	reloadEleventyProjects,
} from "./lib/eleventy.js";
import { createFileSystemWatcher } from "./utils/file-system-watcher.js";

export async function activate(context: vscode.ExtensionContext) {
	await loadEleventyProjects();

	// Events
	const eventWorkspaceFolders =
		vscode.workspace.onDidChangeWorkspaceFolders(loadEleventyProjects);

	// Watcher
	const watcherWebC = createFileSystemWatcher(
		webcFilePattern,
		reloadEleventyProjects,
	);

	// Providers
	const providerDocumentLinks = documentLinks();

	context.subscriptions.push(
		eventWorkspaceFolders,
		watcherWebC,
		providerDocumentLinks,
	);
}
