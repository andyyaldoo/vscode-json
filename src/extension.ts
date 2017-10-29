'use strict';

import {
  ExtensionContext, 
  commands, 
  window, 
  TextDocument, 
  Position, 
  Range, 
  extensions,
  TextEditor
} from 'vscode'

export function activate(context: ExtensionContext) {

  console.log("extension active")
  
  let jsonHelper = new JsonHelper()
  
 

  /**
   * This function is used to set the current document text
   * @param newText 
   */
  let setText = (editor: TextEditor, newText: string) => {
    let doc = editor.document
    editor.edit(builder => {
      const lastLine = doc.lineAt(doc.lineCount-1)

      const start = new Position(0, 0);
      const end = new Position(doc.lineCount-1, lastLine.text.length);

      builder.replace(new Range(start, end), newText);
    })
  }

  /**
   * 
   */
  let validateJson = commands.registerCommand('extension.validateJson', () => {
     // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      // NOTE: If not found, do nothing
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText()
    jsonHelper.isValid(text) ? window.showInformationMessage('Valid JSON') : window.showErrorMessage('Invalid JSON')
  });

  /**
   * 
   */
  let escapeJson = commands.registerCommand('extension.escapeJson', () => {
     // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      // NOTE: If not found, do nothing
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText()
    
    let escapedJson = jsonHelper.escape(text)
    setText(editor, escapedJson)
  })

  /**
   * 
   */
  let unescapeJson = commands.registerCommand('extension.unescapeJson', () => {

    // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      // NOTE: If not found, do nothing
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText()
    let unescapedJson = jsonHelper.unescape(text)
    setText(editor, unescapedJson)
  })

  /**
   * 
   */
  let beautifyJson = commands.registerCommand('extension.beautifyJson', () => {
    // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      // NOTE: If not found, do nothing
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;

    let text = doc.getText()
    let tabSize = typeof editor.options.tabSize == "string" ? undefined : editor.options.tabSize
    let beautifiedJson = jsonHelper.beautify(text, tabSize)

    setText(editor, beautifiedJson)
  })

  /**
   * 
   */
  let uglifyJson = commands.registerCommand('extension.uglifyJson', () => {

    // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      // NOTE: If not found, do nothing
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText()
    let uglifiedJson = jsonHelper.uglify(text)
    setText(editor, uglifiedJson)
  })

  context.subscriptions.push(jsonHelper)
  context.subscriptions.push(validateJson);
  context.subscriptions.push(beautifyJson);
  context.subscriptions.push(uglifyJson);
  context.subscriptions.push(escapeJson);
  context.subscriptions.push(unescapeJson);
}

/**
 * 
 */
export class JsonHelper {
  /**
   * 
   * @param text 
   */
  public isValid(text: string): boolean {
    console.log("isValid is called")
    try {
      return typeof JSON.parse(text) === "object"
    } catch(err) {
      return false
    }
  }

  /**
   * 
   * @param text 
   */
  public escape(text: string): string {
    console.log("escape is called")
    return this.isValid(text) ? JSON.stringify(text) : text
  }

  /**
   * 
   * @param text 
   */
  public unescape(text: string): string {
    console.log("unescape is called")
    try {
      return JSON.parse(text)
    } catch(err) {
      console.log(err)
      return text;
    }
  }

  /**
   * 
   * @param text 
   * @param tabSize 
   */
  public beautify(text: string, tabSize?: number): string {
    console.log("beautify is called")
    return this.isValid(text) ? JSON.stringify(JSON.parse(text), null, tabSize) : text
  }
  
  /**
   * 
   * @param text 
   */
  public uglify(text: string): string {
    console.log("uglify is called")
    return this.isValid(text) ? JSON.stringify(JSON.parse(text), null, 0) : text
  }

  /**
   * 
   */
  dispose() {}
}

/**
 * This method is called when this extension is deactivated
 */
export function deactivate() {
}
