import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * This function checks if the current workspace is a Rust project by looking for a Cargo.toml file in the root directory.
 * @returns boolean
 */
export function isRustProject(): boolean {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (!workspaceFolders) {
		return false;
	}
	return fs.existsSync(
		path.join(workspaceFolders[0].uri.fsPath, 'Cargo.toml'),
	);
}
