// @flow

import path from 'path';
import debug from 'debug';
import { promisify } from 'util';
import fs from 'fs';

const log = debug('check-flow:parse-ignore-file');

const readFile = promisify(fs.readFile);
const IGNORE_FILENAME = '.flowignore';
const DEFAULT_FILES = [
  'node_modules/**/*',
];

export default async function parseIgnoreFile(cwd: string) {
  const ignoreFilePath = path.resolve(cwd, IGNORE_FILENAME);

  try {
    const content = await readFile(ignoreFilePath, 'utf-8');

    log('Found .flowignore file');

    return content
      .split('\n')
      .filter(line => line && line.length > 0 && !line.startsWith('#'));
  } catch (error) {
    log('Couldn\'t find a .flowignore file', error);

    return DEFAULT_FILES;
  }
}
