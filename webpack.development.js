
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

process.env.NODE_ENV = 'development'

const devServer = !!process.env.WEBPACK_DEV_SERVER

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve('client/index.js')
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: devServer ? 'http://localhost:3691/assets/' : '/assets/'
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
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
}
