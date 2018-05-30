#!/usr/bin/env node
// @flow

import yargs from 'yargs';

import runFlow from './run-flow';

const argv = yargs.argv;
const ignoreFiles = argv.ignore ? argv.ignore.split(',') : ['node_modules/**/*'];

runFlow(ignoreFiles);
