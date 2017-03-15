const path = require('path');
// require('webpack');
const HTMLWebackPlugin = require('html-webpack-plugin');

const HTMLWebackPluginConfig = new HTMLWebackPlugin({
  template: path.join(__dirname, '/quonvoApp/index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './quonvoApp/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  plugins: [HTMLWebackPluginConfig]
};
