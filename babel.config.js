module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: { node: 6 },
      // Only add polyfills when we use them
      useBuiltIns: 'usage',
    }],
    '@babel/preset-flow',
  ],
};
