const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Sass = require('sass');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    '/js/main': [
      path.resolve('./src/main.js'),
    ],
  },
  output: {
    path: path.resolve('../../public/frontend'),
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.vue'],
    symlinks: false,
  },
  plugins: [
    // clean folder before building
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      __BUILD_ENV__: `'${process.env.NODE_ENV}'`,
      __BUILD_IS_PRODUCTION__: process.env.NODE_ENV === 'production',
      __BUILD_IS_DEVELOPMENT__: process.env.NODE_ENV === 'development',
    }),
    new VueLoaderPlugin(),
    // create manifest file for laravel
    new ManifestPlugin({
      fileName: 'mix-manifest.json',
      basePath: '/frontend',
      seed: {},
    }),
    new CopyPlugin(
      [
        {
          from: 'assets/favicons/*.{svg,png,ico,xml,webmanifest}',
          to: 'assets/favicons/[name].[ext]',
          context: 'src/',
          transformPath (targetPath) {
            return '/' + targetPath;
          },
        },
      ],
    ),
  ],
  optimization: {
    runtimeChunk: {
      name: '/js/runtime',
    },
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: '/js/vendor',
          test: /node_modules/,
          chunks: 'all',
        },
        main: {
          name: '/js/main',
          test: /src/,
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        include: [
          path.resolve('./src'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve('./'),
              },
            },
          },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve('./'),
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
              sassOptions: {
                indentedSyntax: true,
              },
            },
          },
        ],
      },
      // All files inside node_modules should also be under node_modules when compiled.
      {
        test: /\.(png|jpe?g|gif|webp|svg|json|woff|woff2|eot|ttf|pdf)$/,
        loader: 'file-loader',
        include: [
          path.resolve('./node_modules'),
        ],
        options: {
          esModule: false,
          context: path.resolve('./'),
          name: '[path][name].[ext]',
          outputPath: '/assets',
          publicPath: 'frontend/assets/',
        },
      },
      // All Project asset files should be under assets directly.
      {
        test: /\.(png|jpe?g|gif|webp|svg|json|woff|woff2|eot|ttf|pdf)$/,
        loader: 'file-loader',
        include: [
          path.resolve('./src/assets'),
        ],
        exclude: [
          path.resolve('./src/assets/inline'),
        ],
        options: {
          esModule: false,
          context: path.resolve('./src/assets'),
          name: '[path][name].[ext]',
          outputPath: '/assets',
          publicPath: 'frontend/assets/',
        },
      },
      // Dynamic loading for inline svg files per require
      {
        test: /\.svg$/,
        loader: 'html-loader',
        include: [
          path.resolve('./src/assets/inline'),
        ],
        options: {
          esModule: false,
          context: path.resolve('./src/assets/inline'),
          minimize: true,
        },
      },
    ],
  },
};
