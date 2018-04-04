
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const webpack = require('webpack')
const path = require('path')

process.env.NODE_ENV = 'production'
const WEBPACK_WATCH = !!process.env.WEBPACK_WATCH

module.exports = {
  mode: 'production',
  bail: true,
  devtool: 'source-map',
  entry: {
    index: path.resolve('client/index.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: '/assets/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              minimize: !WEBPACK_WATCH,
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1024 * 10
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css',
      chunkFilename: '[name].[chunkhash].css'
    }),
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    new Visualizer({
      filename: 'index.html'
    })
  ],
  optimization: {
    minimizer: [
      !WEBPACK_WATCH && new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
          mangle: true,
          output: {
            comments: false
          }
        }
      })
    ].filter(Boolean)
  }
}
