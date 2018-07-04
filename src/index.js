#!/usr/bin/env node
// @flow

import yargs from 'yargs';
import flow from 'flow-bin';
import ora from 'ora';
import path from 'path';
import debug from 'debug';
import fs from 'fs';
import { promisify } from 'util';

import runFlow from './run-flow';

const log = debug('check-flow');

const readFile = promisify(fs.readFile);
const spinner = ora('Running flow');
const IGNORE_FILENAME = '.flowignore';
const DEFAULT_FILES = [
  'node_modules/**/*',
];

async function parseIgnoreFile() {
  const cwd = process.cwd();
  const ignoreFilePath = path.resolve(cwd, IGNORE_FILENAME);

  try {
    const content = await readFile(ignoreFilePath, 'utf-8');

    log('Found .flowignore file');

    return content
      .split('\n')
      .filter(line => line && line.length > 0 && !line.startsWith('#'));
  } catch (error) {
    log('Couldn\'t find a .flowignore file', error);

    return DEFAULT_FILES;
  }
}

const argv = yargs
  .command('$0', 'Run flow check with ignoring errors and warnings from certain files')
  .version()
  .help()
  .argv;

async function run() {
  // eslint-disable-next-line no-console
  console.log('');

  spinner.start();

  const ignoreFiles = await parseIgnoreFile();

  try {
    const output = await runFlow(flow, {
      includeFiles: argv._.length === 0 ? ['*'] : argv._,
      ignoreFiles,
      options: process.argv
        .slice(2)
        .filter(arg => /^--\w+^/.test(arg) || /^--\w+=.+$/.test(arg)),
    });

    spinner.stop();

    // eslint-disable-next-line no-console
    console.log(output);
  } catch (error) {
    spinner.stop();

    // eslint-disable-next-line no-console
    console.log(error);

    // End the process when we have more than one error with an error code
    process.exit(2);
  }
}

run();
