// @flow strict-local

import { execFile } from 'child_process';

import Parser from './parser';

type Options = {|
  ignoreFiles: $ReadOnlyArray<string>,
  includeFiles: $ReadOnlyArray<string>,
  options: $ReadOnlyArray<string>,
  maxWarnings: number,
|};

export default function runFlow(flow: string, options: Options): Promise<string> {
  // eslint-disable-next-line promise/avoid-new
  return new Promise((resolve, reject) => {
    const parser = new Parser(options);

    execFile(flow, [
      'check',
      ...options.options,
      // eslint-disable-next-line promise/prefer-await-to-callbacks, handle-callback-err
    ], (err, stdout) => {
      parser.parse(stdout);

      const {
        errors,
        warnings,
      } = parser.getReport();
      // eslint-disable-next-line fp/no-let
      let output = '';

      output += errors.join('\n');
      output += warnings.join('\n');

      if (warnings.length > 0) {
        output += `Found ${warnings.length} warning${warnings.length === 1 ? '' : 's'}\n`;
      }

      output += `Found ${errors.length} error${errors.length === 1 ? '' : 's'}\n`;

      if (errors.length > 0) {
        return reject(output);
      }

      if (warnings.length > 0 && warnings.length >= options.maxWarnings) {
        return reject(output);
      }

      return resolve(output);
    });
  });
}
