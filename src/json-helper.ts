let JSON = require("json-bigint");
export default class {
  /**
   * isValid
   * @param text
   */
  public isValid(text: string): boolean {
    try {
      return typeof JSON.parse(text) === "object";
    } catch (err) {
      return false;
    }
  }

  /**
   * escape
   * @param text
   */
  public escape(text: string): string {
    return JSON.stringify(text).replace(/^"/g, "").replace(/"$/g, "");
  }

  /**
   * unescape
   * @param text
   */
  public unescape(text: string): string {
    let formattedText = text;
    try {
      if (!text.startsWith('"')) {
        formattedText = '"'.concat(formattedText);
      }

      if (!text.endsWith('"')) {
        formattedText = formattedText.concat('"');
      }

      return JSON.parse(formattedText);
    } catch (err) {
      return text;
    }
  }

  /**
   * beautify
   * @param text
   * @param tabSize
   */
  public beautify(text: string, tabSize?: number | string): string {
    return this.isValid(text)
      ? JSON.stringify(JSON.parse(text), null, tabSize)
      : text;
  }

  /**
   * uglify
   * @param text
   */
  public uglify(text: string): string {
    return this.isValid(text)
      ? JSON.stringify(JSON.parse(text), null, 0)
      : text;
  }

  /**
   * dispose
   */
  dispose() {}
}
