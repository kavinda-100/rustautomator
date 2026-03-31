import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { updateMainFile } from '../utils/rustUtils';

/**
 * This function updates the  `mod.rs` file inside the module when a new Rust file is created, to include the new module declaration.
 * @returns FileSystemWatcher
 */
export function rustFileCreateWatcherForModules(): vscode.FileSystemWatcher {
	const watcher = vscode.workspace.createFileSystemWatcher('**/src/**/*.rs');

	watcher.onDidCreate(async (uri) => {
		const fileName = path.basename(uri.fsPath, '.rs');
		const dirPath = path.dirname(uri.fsPath);
		const parentModPath = path.join(dirPath, 'mod.rs');

		if (
			fileName !== 'mod' &&
			fileName !== 'main' &&
			fs.existsSync(parentModPath)
		) {
			const modContent = fs.readFileSync(parentModPath, 'utf8');
			if (!modContent.includes(`pub mod ${fileName};`)) {
				// fs.appendFileSync(parentModPath, `\npub mod ${fileName};`);
				updateMainFile(vscode.Uri.file(parentModPath), fileName, false);
			}
		}
	});

	return watcher;
}
