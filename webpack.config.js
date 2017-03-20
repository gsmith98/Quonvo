const path = require('path');
// require('webpack');
const HTMLWebackPlugin = require('html-webpack-plugin');

const HTMLWebackPluginConfig = new HTMLWebackPlugin({
  template: path.join(__dirname, '/src/frontend/index.html'),
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: './src/frontend/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
    publicPath: '/'
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
  devServer: {
    historyApiFallback: {
      disableDotRule: true
    }
  },
  devtool: 'source-map',
  plugins: [HTMLWebackPluginConfig]
};
