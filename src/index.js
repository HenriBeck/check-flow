#!/usr/bin/env node
// @flow

import yargs from 'yargs';
import flow from 'flow-bin';
import ora from 'ora';

import runFlow from './run-flow';

const argv = yargs.argv;
const ignoreFiles = argv.ignore ? argv.ignore.split(',') : ['node_modules/**/*'];
const spinner = ora('Running flow');

// Empty line between command and spinner
console.log('');

spinner.start();

runFlow(flow, ignoreFiles)
  .then((output) => { // eslint-disable-line promise/prefer-await-to-then
    spinner.stop();

    console.log(output);

    return null;
  })
  .catch((error) => {
    spinner.stop();

    console.log(error);

    // End the process when we have more than one error with an error code
    process.exit(2);
  });
