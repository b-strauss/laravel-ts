module.exports = ({env}) => ({
  sourceMap: env === 'development',
  plugins: {
    'postcss-preset-env': {},
    'autoprefixer': {},
    'cssnano': env === 'production',
  },
});
