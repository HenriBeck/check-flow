// @flow strict-local

import { execFile } from 'child_process';
import ora from 'ora';
import flow from 'flow-bin';

const spinner = ora('Running flow');

// Empty line between command and spinner
console.log('');

spinner.start();

class Parser {
  static appendLine(errors, line) {
    return errors.map((error, index) => {
      if (index === errors.length - 1) {
        return `${error}\n${line}`;
      }

      return error;
    });
  }

  ignoreNextLines: boolean;

  constructor() {
    this.ignoreNextLines = false;
  }

  filterErrors(stdout) {
    const lines = stdout.split('\n');

    return lines.reduce((errors, line) => {
      if (/Found \d+ errors?/.test(line)) {
        return this.handleErrorFoundCountLine(errors);
      } else if (/Error -+/.test(line)) {
        return this.handleNewErrorLine(errors, line);
      }

      return this.handleLine(errors, line);
    }, []);
  }

  handleNewErrorLine(errors, line) {
    const [, filePath] = line.match(/Error -+ (.+)/);
    const isInNodeModules = filePath.startsWith('node_modules');

    this.ignoreNextLines = isInNodeModules;

    return isInNodeModules ? errors : [

      ...errors,
      line,
    ];
  }

  handleErrorFoundCountLine(errors) {
    this.ignoreNextLines = true;

    return errors;
  }

  handleLine(errors, line) {
    return this.ignoreNextLines ? errors : Parser.appendLine(errors, line);
  }
}

const parser = new Parser();

execFile(flow, ['check', '--color=always'], (err, stdout) => {
  spinner.stop();

  const filteredErrors = parser.filterErrors(stdout);
  const errorsCount = filteredErrors.length;

  if (filteredErrors.length > 0) {
    console.log(filteredErrors.join('\n'));
  }

  console.log(`Found ${errorsCount} error${errorsCount === 1 ? '' : 's'}\n`);

  if (filteredErrors.length > 0) {
    process.exit(2); // eslint-disable-line unicorn/no-process-exit
  }
});
