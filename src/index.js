#!/usr/bin/env node
// @flow

import yargs from 'yargs';
import flow from 'flow-bin';
import ora from 'ora';
import debug from 'debug';

import parseIgnoreFile from './parse-ignore-file';
import runFlow from './run-flow';

const log = debug('check-flow:bin');

const spinner = ora('Running flow');

const argv = yargs
  .command('$0', 'Run flow check with ignoring errors and warnings from certain files')
  .option('max-warnings', { default: Infinity })
  .version()
  .help()
  .argv;

async function run() {
  // eslint-disable-next-line no-console
  console.log('');

  spinner.start();

  const ignoreFiles = await parseIgnoreFile(process.cwd());

  try {
    log('Running flow check');

    const output = await runFlow(flow, {
      maxWarnings: parseInt(argv.maxWarnings, 10),
      includeFiles: argv._.length === 0 ? ['*'] : argv._,
      ignoreFiles,
      options: process.argv
        .slice(2)
        .filter(arg => /^--\w+^/.test(arg) || /^--\w+=.+$/.test(arg)),
    });

    spinner.stop();

    log('Finished running flow check with 0 errors');

    // eslint-disable-next-line no-console
    console.log(output);
  } catch (error) {
    spinner.stop();

    log('Finished running flow check with errors');

    // eslint-disable-next-line no-console
    console.log(error);

    // End the process when we have more than one error with an error code
    process.exit(2);
  }
}

run();
