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

/**
 * This function updates the main.rs or lib.rs or mod.rs file to include the new module declaration.
 * @param mainFileUri The path of the directory
 * @param moduleName The name of the folder needs to be created or append to the main.rs or lib.rs or mod.rs file
 * @param isMainFile Whether the file is main.rs (true) or mod.rs (false)
 */
export async function updateMainFile(
	mainFileUri: vscode.Uri,
	moduleName: string,
	isMainFile: boolean = true,
) {
	const document = await vscode.workspace.openTextDocument(mainFileUri);
	const text = document.getText();
	const lines = text.split(/\r?\n/);

	let lastImportOrModLine = -1;

	// 1. Find the injection point
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i].trim();
		if (line.startsWith('use ') || line.startsWith('mod ')) {
			lastImportOrModLine = i;
		}
	}

	const edit = new vscode.WorkspaceEdit();
	const newModDeclaration = isMainFile
		? `\nmod ${moduleName};\n`
		: `\npub mod ${moduleName};\n`;

	if (lastImportOrModLine !== -1) {
		// Insert after the last found import/mod
		const position = new vscode.Position(lastImportOrModLine + 1, 0);
		edit.insert(mainFileUri, position, newModDeclaration);
	} else {
		// No imports found, insert at the top
		const position = new vscode.Position(0, 0);
		edit.insert(mainFileUri, position, newModDeclaration);
	}

	// 2. Apply the edit
	await vscode.workspace.applyEdit(edit);
	// 3. Save the file automatically
	await document.save();
}
