// @flow strict-local

import ignore, { type Ignore } from 'ignore';

type Options = {
  ignoreFiles: $ReadOnlyArray<string>,
  includeFiles: $ReadOnlyArray<string>,
};

/**
 * The Parser for the flow output.
 *
 * @author Henri Beck
 */
export default class Parser {
  /**
   * Append a line to the last error.
   *
   * @param {String[]} errors - The array of errors.
   * @param {String} line - The line to append to the last error.
   * @returns {String[]} - Returns a new list of errors.
   */
  static appendLine(errors: $ReadOnlyArray<string>, line: string): $ReadOnlyArray<string> {
    return errors.map((error, index) => {
      if (index === errors.length - 1) {
        return `${error}\n${line}`;
      }

      return error;
    });
  }

  /**
   * A flag for ignoring the next lines.
   */
  ignoreNextLines: boolean;

  /**
   * The ignored files.
   */
  ignoreFiles: Ignore;

  /**
   * The included files.
   */
  includeFiles: Ignore;

  /**
   * Initialize some constants.
   *
   * @param {Object} options - The options for the parser.
   * @param {String[]} options.ignoreFiles - The files to ignore.
   * Defaults to node_modules/.
   * @param {String[]} options.includeFiles - The files to only include in the output.
   * Defaults to *.
   */
  constructor(options: Options) {
    this.ignoreNextLines = false;
    this.ignoreFiles = ignore().add(options.ignoreFiles);
    this.includeFiles = ignore().add(options.includeFiles);
  }

  /**
   * Filter the errors from the stdout outputted by flow.
   *
   * @param {String} stdout - The stdout from flow.
   * @returns {String[]} - Returns an array of errors.
   */
  filterErrors(stdout: string) {
    const lines = stdout.split('\n');

    return lines.reduce((errors, line) => {
      if (/Found \d+ errors?/.test(line)) {
        return this.handleErrorFoundCountLine(errors);
      } else if (/(Error|Warning) -+/.test(line)) {
        return this.handleNewErrorLine(errors, line, /Error -+ (.+):\d+:\d+/);
      } else if (/(Error|Warning): /.test(line)) {
        return this.handleNewErrorLine(errors, line, /Error: (.+):\d+/);
      }

      return this.handleLine(errors, line);
    }, []);
  }

  /**
   * Handle a new error. This will check if the path matches one of the globs
   * from the ignored files and will then either add the error or ignore the lines
   * till the next error comes.
   *
   * @param {String[]} errors - The array of errors.
   * @param {String} line - The currently processed line.
   * @param {Regex} regex - The regex to get the file path from.
   * @returns {String[]} - Returns a new array of errors.
   */
  handleNewErrorLine(errors: $ReadOnlyArray<string>, line: string, regex: RegExp) {
    const matches = line.match(regex);

    if (!matches) {
      this.ignoreNextLines = false;

      return [
        ...errors,
        line,
      ];
    }

    const filePath = matches[1];

    // Ignore the error when the file path is in the ignored files
    if (this.ignoreFiles.ignores(filePath)) {
      this.ignoreNextLines = true;

      return errors;
    }

    // Ignore the next lines when the file path isn't in the included files
    this.ignoreNextLines = !this.includeFiles.ignores(filePath);

    return this.ignoreNextLines ? errors : [
      ...errors,
      line,
    ];
  }

  /**
   * This will be called when we find the error count provided by flow.
   * We want to ignore every line afterwards because we provide our own error count.
   *
   * @param {String[]} errors - The errors.
   * @returns {String[]} - It will just return the errors.
   */
  handleErrorFoundCountLine(errors: $ReadOnlyArray<string>) {
    this.ignoreNextLines = true;

    return errors;
  }

  /**
   * Check if we still ignore lines and elsewise just add the line to the last error.
   *
   * @param {String[]} errors - The errors array.
   * @param {String} line - The current checked line.
   * @returns {String[]} - Returns the new errors.
   */
  handleLine(errors: $ReadOnlyArray<string>, line: string) {
    return this.ignoreNextLines ? errors : Parser.appendLine(errors, line);
  }
}
