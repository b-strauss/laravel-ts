const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const Sass = require('sass');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const yargs = require('yargs-parser');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const args = yargs(process.argv);

const analyze = args.analyze || false;

/**
 * @param {string} path
 * @returns {string}
 */
function removeHash (path) {
  return path.replace(/\.[a-f0-9]{32}/, '');
}

/**
 * @param {string} string
 * @returns {string}
 */
function escapeString (string) {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

const fileMappings = {};

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    '/js/main': [
      path.resolve('./src/main.js'),
    ],
  },
  output: {
    path: path.resolve('../../public/frontend'),
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
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
      map: (file) => {
        // Remove hashes in manifest keys generated by broken copy plugin
        file.name = removeHash(file.name);
        return file;
      },
    }),
    new CopyPlugin(
      [
        {
          // copy images first, and save file mappings
          from: 'assets/favicons/*.{svg,png,ico}',
          to: 'assets/favicons/[name].[hash].[ext]',
          context: 'src/',
          transformPath (targetPath) {
            const hashName = path.basename(targetPath);
            const name = removeHash(hashName);
            fileMappings[name] = hashName;
            return '/' + targetPath;
          },
        },
      ],
    ),
    new CopyPlugin(
      [
        {
          // copy manifest files second, and replace the file references
          from: 'assets/favicons/*.{xml,webmanifest}',
          to: 'assets/favicons/[name].[hash].[ext]',
          context: 'src/',
          transform: content => {
            let contentString = content.toString();

            Object.entries(fileMappings)
              .forEach(([key, value]) => {
                contentString = contentString.replace(new RegExp(escapeString(key), 'g'), value);
              });

            return Buffer.from(contentString);
          },
          transformPath (targetPath) {
            return '/' + targetPath;
          },
        },
      ],
    ),
    analyze
      ? new VisualizerPlugin()
      : () => {
      },
    analyze
      ? new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
      })
      : () => {
      },
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
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              // https://github.com/TypeStrong/ts-loader#faster-builds
              transpileOnly: false,
            },
          },
        ],
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
          name: '[path][name].[hash].[ext]',
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
          name: '[path][name].[hash].[ext]',
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
