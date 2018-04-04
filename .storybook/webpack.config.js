
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        // TODO: modularize into a share loaders config file
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
  }
}
