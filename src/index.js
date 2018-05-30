#!/usr/bin/env node
// @flow

import yargs from 'yargs';
import flow from 'flow-bin';

import runFlow from './run-flow';

const argv = yargs.argv;
const ignoreFiles = argv.ignore ? argv.ignore.split(',') : ['node_modules/**/*'];

runFlow(flow, ignoreFiles);
