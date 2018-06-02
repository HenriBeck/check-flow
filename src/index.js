#!/usr/bin/env node
// @flow

import yargs from 'yargs';
import flow from 'flow-bin';
import ora from 'ora';

import runFlow from './run-flow';

const argv = yargs
  .option('ignore', {
    alias: 'i',
    default: 'node_modules/**/*',
  }).argv;
const spinner = ora('Running flow');

// Empty line between command and spinner
// eslint-disable-next-line no-console
console.log('');

spinner.start();

runFlow(flow, {
  ignoreFiles: argv.ignore.split(','),
  options: process.argv
    .slice(2)
    .filter(arg => /^--\w+^/.test(arg) || /^--\w+=.+$/.test(arg))
    .filter(arg => !/^--i(gnore)?/.test(arg)),
  args: argv._,
})
  .then((output) => { // eslint-disable-line promise/prefer-await-to-then
    spinner.stop();

    // eslint-disable-next-line no-console
    console.log(output);

    return null;
  })
  .catch((error) => {
    spinner.stop();

    // eslint-disable-next-line no-console
    console.log(error);

    // End the process when we have more than one error with an error code
    process.exit(2);
  });
