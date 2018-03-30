
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
  bail: true,
  devtool: 'source-map',
  entry: {
    index: path.resolve('client/index.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
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
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1024 * 10
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    new ManifestPlugin({
      fileName: 'manifest.json'
    }),
    new Visualizer({
      filename: 'index.html'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // https://github.com/webpack-contrib/mini-css-extract-plugin#features
        // We don't have enough CSS to care about code splitting CSS
        styles: {
          name: 'index',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
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
    ]
  }
}
