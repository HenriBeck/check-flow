// @flow strict-local

import test from 'ava';
import flow from 'flow-0.68.0';

import runFlow from '../src/run-flow';

import {
  ignoredFiles,
  noErrorsIgnoredFiles,
  multipleErrorsIgnoredFiles,
  oneErrorIgnoredFiles,
} from './constants';

test('flow 0.68.0: no errors', async (t) => {
  const result = await runFlow(flow, {
    ignoreFiles: [
      ...ignoredFiles,
      ...noErrorsIgnoredFiles,
    ],
    args: ['tests/'],
    options: ['--color=never'],
  });

  t.snapshot(result);

  t.true(result.includes('Found 0 errors'));
});

test('flow 0.68.0: one error', async (t) => {
  try {
    const res = await runFlow(flow, {
      ignoreFiles: [
        ...ignoredFiles,
        ...oneErrorIgnoredFiles,
      ],
      args: ['tests/'],
      options: ['--color=never'],
    });

    t.fail(res);
  } catch (error) {
    t.snapshot(error);

    t.true(error.includes('Found 1 error'));
  }
});

test('flow 0.68.0: multiple errors', async (t) => {
  try {
    const res = await runFlow(flow, {
      ignoreFiles: [
        ...ignoredFiles,
        ...multipleErrorsIgnoredFiles,
      ],
      args: ['tests/'],
      options: ['--color=never'],
    });

    t.fail(res);
  } catch (error) {
    t.snapshot(error);

    t.true(error.includes('Found 2 errors'));
  }
});
