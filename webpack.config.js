const pathLib = require('path');

module.exports = {
  entry: './client/index.js',
  mode: 'development',
  output: {
    path: pathLib.join(__dirname, 'public'),
    filename: 'bundle.js',
    // publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
