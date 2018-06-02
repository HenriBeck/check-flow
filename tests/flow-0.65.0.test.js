// @flow strict-local

import test from 'ava';
import flow from 'flow-0.65.0';

import runFlow from '../src/run-flow';

import {
  ignoredFiles,
  noErrorsIgnoredFiles,
  multipleErrorsIgnoredFiles,
  oneErrorIgnoredFiles,
} from './constants';

test('flow 0.65.0: no errors', async (t) => {
  const result = await runFlow(flow, []);

  t.snapshot(result);
});

test('flow 0.65.0: one error', async (t) => {
  try {
    console.log(process.cwd());
    const res = await runFlow(flow, []);

    t.fail(res);
  } catch (error) {
    t.snapshot(error);
  }
});

test('flow 0.65.0: multiple errors', async (t) => {
  try {
    const res = await runFlow(flow, []);

    t.fail(res);
  } catch (error) {
    t.snapshot(error);
  }
});
