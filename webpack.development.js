
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

process.env.NODE_ENV = 'development'

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'client/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js'
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
