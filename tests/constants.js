// @flow strict-local

export const ignoredFiles = [
  'tests/*',
];

export const noErrorsIgnoredFiles = [
  'tests/flow-test-files/one-error.js',
  'tests/flow-test-files/multiple-errors.js',
];

export const oneErrorIgnoredFiles = [
  'tests/flow-test-files/no-errors.js',
  'tests/flow-test-files/multiple-errors.js',
];

export const multipleErrorsIgnoredFiles = [
  'tests/flow-test-files/one-error.js',
  'tests/flow-test-files/no-errors.js',
];

export const noErrorsOptions = {
  ignoreFiles: [],
  includeFiles: ['tests/flow-test-files/no-errors.js'],
  options: ['--color=never'],
};

export const oneErrorOptions = {
  ignoreFiles: [],
  includeFiles: ['tests/flow-test-files/one-error.js'],
  options: ['--color=never'],
};

export const multipleErrorsOptions = {
  ignoreFiles: [],
  includeFiles: ['tests/flow-test-files/multiple-errors.js'],
  options: ['--color=never'],
};
