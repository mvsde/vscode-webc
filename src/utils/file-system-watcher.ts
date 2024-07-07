import vscode from "vscode";

export function createFileSystemWatcher(
	glob: vscode.GlobPattern,
	callback: (event: vscode.Uri) => void,
) {
	const watcher = vscode.workspace.createFileSystemWatcher(glob);

	watcher.onDidCreate(callback);
	watcher.onDidChange(callback);
	watcher.onDidDelete(callback);

	return watcher;
}
