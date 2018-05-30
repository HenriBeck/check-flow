// @flow strict-local

import { execFile } from 'child_process';
import ora from 'ora';

import Parser from './parser';

export default function runFlow(flow: string, ignoreFiles: $ReadOnlyArray<string>) {
  const spinner = ora('Running flow');
  const parser = new Parser(ignoreFiles);

  // Empty line between command and spinner
  console.log('');

  spinner.start();

  // eslint-disable-next-line promise/prefer-await-to-callbacks, handle-callback-err
  execFile(flow, ['check', '--color=always'], (err, stdout) => {
    spinner.stop();

    // Filter the errors from the stdout
    const filteredErrors = parser.filterErrors(stdout);
    const errorsCount = filteredErrors.length;

    // If we have errors, log them out
    if (filteredErrors.length > 0) {
      console.log(filteredErrors.join('\n'));
    }

    // Output the actual error count
    console.log(`Found ${errorsCount} error${errorsCount === 1 ? '' : 's'}\n`);

    // End the process when we have more than one error with an error code
    if (filteredErrors.length > 0) {
      process.exit(2); // eslint-disable-line unicorn/no-process-exit
    }
  });
}
