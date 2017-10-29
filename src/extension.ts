'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {ExtensionContext, commands, window, TextDocument} from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "json" is now active!');

    let jsonHelper = new JsonHelper()

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.validateJson', () => {
        // The code you place here will be executed every time your command is executed

        
    });
    context.subscriptions.push(jsonHelper)
    context.subscriptions.push(disposable);
}


export class JsonHelper {
  public validateJson() {

    // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      return // NOTE: If not found, do nothing
    }

    let doc = editor.document;

    if (doc.languageId === "json") {
      let text = doc.getText()
      
      if (this.isValid(text)) {
        window.showInformationMessage('Valid JSON');
      } else {
        window.showInformationMessage('Invalid JSON');
      }
      
    } else {
      return // NOTE: if not json, do nothing 
    }
  }

  public isValid(text: string): boolean {
    try {
      return typeof JSON.parse(text) === "object"
    } catch(err) {
      console.log(err)
      return false
    }
  }

  public escape(text: string): string {
    return this.isValid(text) ? JSON.stringify(text) : text
  }

  public unescape(text: string): string {
    return this.isValid(text) ? JSON.parse(text) : text
  }

  public beautify(text: string): string {
    return JSON.stringify(JSON.parse(text), null, 4)
  }
  public uglify(text: string): string {
    return JSON.stringify(JSON.parse(text), null, 0)
  }

  dispose() {}
  
}
// this method is called when your extension is deactivated
export function deactivate() {
}