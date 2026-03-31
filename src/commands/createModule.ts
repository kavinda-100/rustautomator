import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { isRustProject, updateMainFile } from '../utils/rustUtils';

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
		await updateMainFile(vscode.Uri.file(libPath), folderName, true);
	} else {
		vscode.window.showWarningMessage(
			'No main.rs or lib.rs found in src. Please add the module declaration manually.',
		);
	}

	vscode.window.showInformationMessage(
		`Module ${folderName} created successfully!`,
	);
}
