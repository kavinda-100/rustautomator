import * as vscode from 'vscode';
import { createRustModule } from './commands/createModule';
import { rustFileCreateWatcherForModules } from './watchers/rustFileWatcher';

export function activate(context: vscode.ExtensionContext) {
	// Register Command
	const createModCmd = vscode.commands.registerCommand(
		'rust-mod-automator.createRustModule',
		createRustModule,
	);

	// Initialize Watcher
	const rustWatcher = rustFileCreateWatcherForModules();

	// Cleanly manage lifecycles
	context.subscriptions.push(createModCmd, rustWatcher);
}

export function deactivate() {}
