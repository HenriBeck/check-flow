// @flow strict-local

import test from 'ava';
import flow from 'flow-0.65.0';

import runFlow from '../src/run-flow';

import {
  multipleErrorsOptions,
  noErrorsOptions,
  oneErrorOptions,
} from './constants';

test.only('flow 0.65.0: no errors', async (t) => {
  const result = await runFlow(flow, noErrorsOptions);

  t.snapshot(result);

  t.true(result.includes('Found 0 errors'));
});

test('flow 0.65.0: one error', async (t) => {
  try {
    const res = await runFlow(flow, oneErrorOptions);

    t.fail(res);
  } catch (error) {
    t.snapshot(error);

    t.true(error.includes('Found 1 error'));
  }
});

test('flow 0.65.0: multiple errors', async (t) => {
  try {
    const res = await runFlow(flow, multipleErrorsOptions);

    t.fail(res);
  } catch (error) {
    t.snapshot(error);

    t.true(error.includes('Found 2 errors'));
  }
});
