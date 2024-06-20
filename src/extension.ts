import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('extension.toggleJupyter', async () => {
        const extId = 'ms-toolsai.jupyter';

        let extension = vscode.extensions.getExtension(extId);
        if (!extension) {
            vscode.window.showWarningMessage('Jupyter extension not found.');
            return;
        }

        try {
            if (extension.isActive) {
                await vscode.commands.executeCommand('workbench.extensions.disableExtension', extId);
                setTimeout(() => {
                    vscode.commands.executeCommand('workbench.extensions.enableExtension', extId);
                }, 1000);
            } else {
                vscode.commands.executeCommand('workbench.extensions.enableExtension', extId);
            }
        } catch (error) {
            vscode.window.showErrorMessage('Error toggling Jupyter extension: ' + error.message);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
