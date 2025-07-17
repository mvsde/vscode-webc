import { type GlobPattern, type Uri, workspace } from "vscode";

export function createFileSystemWatcher(glob: GlobPattern, callback: (event: Uri) => void) {
	const watcher = workspace.createFileSystemWatcher(glob);

	watcher.onDidCreate(callback);
	watcher.onDidChange(callback);
	watcher.onDidDelete(callback);

	return watcher;
}
