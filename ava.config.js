// @flow

export default {
  verbose: true,
  cache: true,
  // Only run flow once a time
  concurrency: 1,
  // Don't run other flow versions when 1 already failed
  failFast: false,
  require: [
    '@babel/register',
    '@babel/polyfill',
  ],
  files: [
    'src/*.test.js',
    'tests/*.test.js',
  ],
  snapshotDir: './snapshots',
};
