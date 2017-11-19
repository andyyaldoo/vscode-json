'use strict';

import {
  ExtensionContext, 
  commands, 
  window, 
  TextDocument, 
  Position, 
  Range, 
  extensions,
  TextEditor,
  workspace
} from 'vscode'

import JsonHelper from './JsonHelper'

export function activate(context: ExtensionContext) {
  
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
   * validateJson
   */
  let validateJson = commands.registerCommand('extension.validateJson', () => {
     // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText();

    // NOTE: Remove trailing and leading whitespace
    let trimmedText = text.trim().replace(/(?:^[\n\t\r]|[\n\t\r]$)/g,"");

    // NOTE: Determine whether JSON is valid or invalid
    jsonHelper.isValid(trimmedText) ? window.showInformationMessage('Valid JSON') : window.showErrorMessage('Invalid JSON')
  });

  /**
   * escapeJson
   */
  let escapeJson = commands.registerCommand('extension.escapeJson', () => {
     // NOTE: Get active editor
    let editor = window.activeTextEditor
    
    if (!editor) {
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText();
    
    // NOTE: Remove trailing and leading whitespace
    let trimmedText = text.trim().replace(/(?:^[\n\t\r]|[\n\t\r]$)/g,"");
    
    // NOTE: Escape JSON
    let escapedJson = jsonHelper.escape(trimmedText)
    if (escapedJson !== trimmedText) {
      setText(editor, escapedJson)
    }
  })

  /**
   * unescapeJson
   */
  let unescapeJson = commands.registerCommand('extension.unescapeJson', () => {
    // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText();

    // NOTE: Remove trailing and leading whitespace
    let trimmedText = text.trim().replace(/(?:^[\n\t\r]|[\n\t\r]$)/g,"");

    // NOTE: Unescape JSON
    let unescapedJson = jsonHelper.unescape(trimmedText)

    if (unescapedJson !== trimmedText) {
      setText(editor, unescapedJson)
    }
  })

  /**
   * beautifyJson
   */
  let beautifyJson = commands.registerCommand('extension.beautifyJson', () => {
    // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText()

    // NOTE: Remove trailing and leading whitespace
    let trimmedText = text.trim().replace(/(?:^[\n\t\r]|[\n\t\r]$)/g,"");
    
    // NOTE: Determine tabsize
    let tabSize = typeof editor.options.tabSize == "string" ? undefined : editor.options.tabSize

    // NOTE: Beautify JSON
    let beautifiedJson = jsonHelper.beautify(trimmedText, tabSize)
    if (beautifiedJson !== trimmedText) {
      setText(editor, beautifiedJson)
    }
  })

  /**
   * uglifyJson
   */
  let uglifyJson = commands.registerCommand('extension.uglifyJson', () => {

    // NOTE: Get active editor
    let editor = window.activeTextEditor
    if (!editor) {
      return 
    }
    
    // NOTE: Get the document
    let doc = editor.document;
    let text = doc.getText()

    // NOTE: Remove trailing and leading whitespace
    let trimmedText = text.trim().replace(/(?:^[\n\t\r]|[\n\t\r]$)/g,"");

    // NOTE: Uglify JSON
    let uglifiedJson = jsonHelper.uglify(trimmedText)
    if (uglifiedJson !== trimmedText) {
      setText(editor, uglifiedJson)
    }
  })

  context.subscriptions.push(jsonHelper)
  context.subscriptions.push(validateJson);
  context.subscriptions.push(beautifyJson);
  context.subscriptions.push(uglifyJson);
  context.subscriptions.push(escapeJson);
  context.subscriptions.push(unescapeJson);
}

/**
 * This method is called when this extension is deactivated
 */
export function deactivate() {
}
