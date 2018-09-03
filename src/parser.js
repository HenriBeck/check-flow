// @flow strict-local

import debug from 'debug';
import ignore, { type Ignore } from 'ignore';

type Options = {
  ignoreFiles: $ReadOnlyArray<string>,
  includeFiles: $ReadOnlyArray<string>,
};

const log = debug('check-flow:parser');

const ERROR_MATCHING_REGEX = /(Error|Warning)(?:: | -+)(.+)*/;
const FOUND_ERRORS_REGEX = /Found \d+ errors?/;

/**
 * The Parser for the flow output.
 *
 * @author Henri Beck
 */
export default class Parser {
  /**
   * The ignored files.
   */
  ignoreFiles: Ignore = ignore();

  /**
   * The included files.
   */
  includeFiles: Ignore = ignore();

  /**
   *
   */
  errors: $ReadOnlyArray<string> = [];

  /**
   *
   */
  warnings: $ReadOnlyArray<string> = [];

  /**
   *
   * @type {Array}
   */
  lines: $ReadOnlyArray<string> = [];

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
    this.ignoreFiles.add(options.ignoreFiles);
    this.includeFiles.add(options.includeFiles);
  }

  parse(stdout: string) {
    this.lines = stdout.split('\n');

    while (this.lines.length > 0) {
      const line = this.getCurrentLine();

      if (FOUND_ERRORS_REGEX.test(line)) {
        this.lines = [];

        // Stop the loop
        break;
      }

      const match = line.match(ERROR_MATCHING_REGEX);

      if (match) {
        const [, type, file] = match;
        const fileMatch = file.match(/^(.*?):/);

        if (fileMatch) {
          const lines = this.getErrorLines(line);

          if (this.includeError(fileMatch[1].trim())) {
            if (type === 'Error') {
              this.addError(lines);
            } else if (type === 'Warning') {
              this.addWarning(lines);
            } else {
              log('Unknown type', type);
            }
          }
        }
      }
    }
  }

  addError(lines: $ReadOnlyArray<string>) {
    this.errors = [
      ...this.errors,
      lines.join('\n'),
    ];
  }

  addWarning(lines: $ReadOnlyArray<string>) {
    this.warnings = [
      ...this.warnings,
      lines.join('\n'),
    ];
  }

  getErrorLines(line: string) {
    const lines = [line];

    // Remove the lines until the next error or warning comes
    while (!ERROR_MATCHING_REGEX.test(this.lines[0]) && !FOUND_ERRORS_REGEX.test(this.lines[0])) {
      lines.push(this.getCurrentLine());
    }

    return lines;
  }

  includeError(filepath: string) {
    // Ignore the error when the file path is in the ignored files
    if (this.ignoreFiles.ignores(filepath)) {
      log('Ignoring error in file:', filepath, 'because it\'s an ignored file');

      return false;
    }

    if (!this.includeFiles.ignores(filepath)) {
      log('Ignoring error in file:', filepath, 'because it\'s not an included file');

      return false;
    }

    return true;
  }

  getCurrentLine() {
    const [line, ...rest] = this.lines;

    this.lines = rest;

    return line;
  }

  getReport() {
    return {
      errors: this.errors,
      warnings: this.warnings,
    };
  }
}
