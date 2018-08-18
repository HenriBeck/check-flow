// @flow strict-local

import { execFile } from 'child_process';

import Parser from './parser';

type Options = {|
  ignoreFiles: $ReadOnlyArray<string>,
  includeFiles: $ReadOnlyArray<string>,
  options: $ReadOnlyArray<string>,
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
      // Filter the errors from the stdout
      const filteredErrors = parser.filterErrors(stdout);
      const errorsCount = filteredErrors.length;
      const errosOutput = filteredErrors.join('\n');
      const output = `${errosOutput}Found ${errorsCount} error${errorsCount === 1 ? '' : 's'}\n`;

      return errorsCount > 0 ? reject(output) : resolve(output);
    });
  });
}
