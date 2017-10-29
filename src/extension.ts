'use strict';

import {
  ExtensionContext, 
  commands, 
  window, 
  TextDocument, 
  Position, 
  Range, 
  FormattingOptions, 
  TextEditorOptions, 
  extensions
} from 'vscode'

export function activate(context: ExtensionContext) {

  
  let jsonHelper = new JsonHelper()
  
  // NOTE: Get active editor
  let editor = window.activeTextEditor
  if (!editor) {
    // NOTE: If not found, do nothing
    return 
  }
  
  // NOTE: Get the document
  let doc = editor.document;
  if (doc.languageId === "json") {

    

    /**
     * This function is used to set the current document text
     * @param newText 
     */
    let setText = (newText) => {
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
      let text = doc.getText()
      jsonHelper.isValid(text) ? window.showInformationMessage('Valid JSON') : window.showErrorMessage('Invalid JSON')
    });

    /**
     * 
     */
    let escapeJson = commands.registerCommand('extension.escapeJson', () => {
      let text = doc.getText()
      
        let escapedJson = jsonHelper.escape(text)
        setText(escapedJson)
    })

    /**
     * 
     */
    let unescapeJson = commands.registerCommand('extension.unescapeJson', () => {

      let text = doc.getText()
      let unescapedJson = jsonHelper.unescape(text)
        setText(unescapedJson)
    })

    /**
     * 
     */
    let beautifyJson = commands.registerCommand('extension.beautifyJson', () => {

      let text = doc.getText()
      let tabSize = typeof editor.options.tabSize == "string" ? undefined : editor.options.tabSize
        let beautifiedJson = jsonHelper.beautify(text, tabSize)

        setText(beautifiedJson)
    })

    /**
     * 
     */
    let uglifyJson = commands.registerCommand('extension.uglifyJson', () => {

      let text = doc.getText()
      let uglifiedJson = jsonHelper.uglify(text)
        setText(uglifiedJson)
    })

    context.subscriptions.push(jsonHelper)
    context.subscriptions.push(validateJson);
    context.subscriptions.push(beautifyJson);
    context.subscriptions.push(uglifyJson);
    context.subscriptions.push(escapeJson);
    context.subscriptions.push(unescapeJson);
  } else {
    window.showWarningMessage("Please set the language to json")
  }
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