export default {
  cache: false,
  concurrency: 1,
  failFast: false,
  require: [
    '@babel/register',
    '@babel/polyfill',
  ],
  files: [
    'tests/*.test.js',
  ],
};
