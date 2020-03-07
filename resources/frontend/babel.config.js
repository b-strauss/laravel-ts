module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
      },
    ],
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      // Only needed when polyfills should be compiled into the code.
      // See https://babeljs.io/docs/en/babel-plugin-transform-runtime for more infos.
      {
        absoluteRuntime: true,
        corejs: 3,
        version: '^7.8.3',
      },
    ],
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-proposal-numeric-separator',
  ],
};
