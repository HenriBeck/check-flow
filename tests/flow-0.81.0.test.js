// @flow strict-local

import test from 'ava';
import flow from 'flow-bin';

import {
  testWithIgnoredFilesAndMultipleErrors,
  testWithIgnoredFilesAndOneError,
  testWithIgnoredFilesAndZeroErrors,
  testWithIncludedFilesAndMultipleErrors,
  testWithIncludedFilesAndOneError,
  testWithIncludedFilesAndZeroErrors,
} from './test-factories';

const version = '0.81.0';

test(testWithIncludedFilesAndZeroErrors, flow, version);

test(testWithIncludedFilesAndOneError, flow, version);

test(testWithIncludedFilesAndMultipleErrors, flow, version);

test(testWithIgnoredFilesAndZeroErrors, flow, version);

test(testWithIgnoredFilesAndOneError, flow, version);

test(testWithIgnoredFilesAndMultipleErrors, flow, version);
