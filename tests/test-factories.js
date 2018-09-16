// @flow

// eslint-disable-next-line ava/use-test
import { type ExecutionContext } from 'ava';

import runFlow from '../src/run-flow';

const defaultOptions = {
  maxWarnings: 0,
  ignoreFiles: [],
  includeFiles: ['.'],
  options: ['--color=never'],
};

async function testWithIncludedFilesAndZeroErrors(t: ExecutionContext<>, flow: string) {
  const result = await runFlow(flow, {
    ...defaultOptions,
    includeFiles: ['tests/flow-test-files/no-errors.js'],
  });

  t.snapshot(result);

  t.true(result.includes('Found 0 errors'));
}

testWithIncludedFilesAndZeroErrors.title = (
  title,
  flow,
  version
) => `flow ${version}: with included files and no errors`;

async function testWithIncludedFilesAndOneError(t: ExecutionContext<>, flow: string) {
  try {
    const res = await runFlow(flow, {
      ...defaultOptions,
      includeFiles: ['tests/flow-test-files/one-error.js'],
    });

    t.fail(res);
  } catch (error) {
    t.snapshot(error);

    t.true(error.includes('Found 1 error'));
  }
}

testWithIncludedFilesAndOneError.title = (
  title,
  flow,
  version
) => `flow ${version}: with included files and 1 error`;

async function testWithIncludedFilesAndMultipleErrors(t: ExecutionContext<>, flow: string) {
  try {
    const res = await runFlow(flow, {
      ...defaultOptions,
      includeFiles: ['tests/flow-test-files/multiple-errors.js'],
    });

    t.fail(res);
  } catch (error) {
    t.snapshot(error);

    t.true(error.includes('Found 2 errors'));
  }
}

testWithIncludedFilesAndMultipleErrors.title = (
  title,
  flow,
  version
) => `flow ${version}: with included files and multiple errors`;

async function testWithIgnoredFilesAndZeroErrors(t: ExecutionContext<>, flow: string) {
  const result = await runFlow(flow, {
    ...defaultOptions,
    includeFiles: ['tests/flow-test-files/*.js'],
    ignoreFiles: [
      'tests/flow-test-files/one-error.js',
      'tests/flow-test-files/multiple-errors.js',
    ],
  });

  t.snapshot(result);

  t.true(result.includes('Found 0 errors'));
}

testWithIgnoredFilesAndZeroErrors.title = (
  title,
  flow,
  version
) => `flow ${version}: with ignored files and no errors`;

async function testWithIgnoredFilesAndOneError(t: ExecutionContext<>, flow: string) {
  try {
    const res = await runFlow(flow, {
      ...defaultOptions,
      includeFiles: ['tests/flow-test-files/*.js'],
      ignoreFiles: [
        'tests/flow-test-files/no-errors.js',
        'tests/flow-test-files/multiple-errors.js',
      ],
    });

    t.fail(res);
  } catch (error) {
    t.snapshot(error);

    t.true(error.includes('Found 1 error'));
  }
}

testWithIgnoredFilesAndOneError.title = (
  title,
  flow,
  version
) => `flow ${version}: with ignored files and 1 error`;

async function testWithIgnoredFilesAndMultipleErrors(t: ExecutionContext<>, flow: string) {
  try {
    const res = await runFlow(flow, {
      ...defaultOptions,
      includeFiles: ['tests/flow-test-files/*.js'],
      ignoreFiles: [
        'tests/flow-test-files/no-errors.js',
        'tests/flow-test-files/one-error.js',
      ],
    });

    t.fail(res);
  } catch (error) {
    t.snapshot(error);

    t.true(error.includes('Found 2 errors'));
  }
}

testWithIgnoredFilesAndMultipleErrors.title = (
  title,
  flow,
  version
) => `flow ${version}: with ignored files and multiple errors`;

export {
  testWithIncludedFilesAndZeroErrors,
  testWithIncludedFilesAndOneError,
  testWithIncludedFilesAndMultipleErrors,
  testWithIgnoredFilesAndMultipleErrors,
  testWithIgnoredFilesAndOneError,
  testWithIgnoredFilesAndZeroErrors,
};
