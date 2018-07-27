// @flow

import test from 'ava';
import path from 'path';

import parseIgnoreFile from './parse-ignore-file';

test('should return default ignore files when no file is found', async (t) => {
  const files = await parseIgnoreFile(__dirname);

  t.deepEqual(files, ['node_modules/**/*']);
});

test('should return ignored files from the file without blank lines and comments', async (t) => {
  const cwd = path.resolve(__dirname, '../tests/flowignore-test-file');
  const files = await parseIgnoreFile(cwd);

  t.deepEqual(files, [
    'test1/*',
    'test2/**/*',
    'babel.config.js',
  ]);
});

