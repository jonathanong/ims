
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Visualizer = require('webpack-visualizer-plugin')
const webpack = require('webpack')
const path = require('path')

process.env.NODE_ENV = 'production'

module.exports = {
  mode: 'production',
  entry: {
    index: path.resolve(__dirname, 'client/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
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
              minimize: true
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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].css',
      chunkFilename: '[id].[chunkhash].css'
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
    new Visualizer()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
          mangle: false,
          output: {
            comments: false
          }
        }
      })
    ]
  }
}
