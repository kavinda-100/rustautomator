import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { isRustProject } from '../utils/rustUtils';

/**
 * This function updates the main.rs or lib.rs file to include the new module declaration.
 * @param mainFileUri The path of the directory
 * @param folderName The name of the folder needs to be create
 * @param isMainFile Whether the file is main.rs (true) or lib.rs (false)
 */
async function updateMainFile(
	mainFileUri: vscode.Uri,
	folderName: string,
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
		? `mod ${folderName};\n`
		: `pub mod ${folderName};\n`;

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

/** * This function creates a new Rust module by creating a new folder and a mod.rs file, and then updates the main.rs or lib.rs file to include the new module declaration.
 * @param uri The path of the directory
 */
export async function createRustModule(uri: vscode.Uri) {
	// 1. Check for Cargo.toml
	if (!isRustProject()) {
		vscode.window.showErrorMessage(
			'Not a Rust project (No Cargo.toml found).',
		);
		return;
	}

	const folderName = await vscode.window.showInputBox({
		prompt: 'Enter module folder name',
		placeHolder: 'e.g., utils',
	});

	if (!folderName) {
		return;
	}

	// Get the path of the src directory
	const srcDir = uri.fsPath;

	// Create the new folder path
	const newFolderPath = path.join(srcDir, folderName);
	// Create the mod.rs file path
	const modFilePath = path.join(newFolderPath, 'mod.rs');

	// Create the directory and mod.rs
	fs.mkdirSync(newFolderPath, { recursive: true });
	fs.writeFileSync(modFilePath, '');

	// Look for main.rs or lib.rs in the src folder
	const mainPath = path.join(srcDir, 'main.rs');
	const libPath = path.join(srcDir, 'lib.rs');

	if (fs.existsSync(mainPath)) {
		await updateMainFile(vscode.Uri.file(mainPath), folderName, true);
	} else if (fs.existsSync(libPath)) {
		await updateMainFile(vscode.Uri.file(libPath), folderName, true); // this is the main for library projects, so we use mod instead of pub mod
	} else {
		vscode.window.showWarningMessage(
			'No main.rs or lib.rs found in src. Please add the module declaration manually.',
		);
	}

	vscode.window.showInformationMessage(
		`Module ${folderName} created successfully!`,
	);
}
