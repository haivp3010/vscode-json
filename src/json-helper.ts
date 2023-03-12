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
    return this.isValid(text)
      ? JSON.stringify(text)
          .replace(/^"/g, "")
          .replace(/"$/g, "")
      : text;
  }

  /*
   * unescape
   * @param text
   */
  public unescape(text: string): string {
    let lines = text.split(/\r?\n/);
    let formattedLines = [];
    for (let line of lines) {
      let formattedText = line;
      try {
        if (!text.startsWith('"')) {
          formattedText = '"'.concat(formattedText);
        }

        if (!text.endsWith('"')) {
          formattedText = formattedText.concat('"');
        }

        formattedLines.push(JSON.parse(formattedText));
      } catch (err) {
        formattedLines.push(text);
      }
    }

    return formattedLines.join('\n');
  }

  /**
   * extract
   * @param text
   */
   public extract(text, field: string): string {
    let lines = text.split(/\r?\n/);
    let formattedLines = [];
    for (let line of lines) {
      formattedLines.push(this.isValid(line) ? JSON.stringify(JSON.parse(line)[field]) : line);
    }
    return formattedLines.join('\n');
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
