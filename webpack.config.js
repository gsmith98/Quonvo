const webpack = require('webpack');
const path = require('path');
const HTMLWebackPlugin = require('html-webpack-plugin');

const HTMLWebackPluginMainPageConfig = new HTMLWebackPlugin({
  template: path.join(__dirname, '/src/frontend/index.html'),
  filename: 'app.html',
  chunks: ['app'],
  inject: 'body'
});

const HTMLWebackPluginLoginPageConfig = new HTMLWebackPlugin({
  template: path.join(__dirname, '/src/frontend/index.html'),
  filename: 'login.html',
  chunks: ['login'],
  inject: 'body'
});

const WebpackDefinePlugin = new webpack.DefinePlugin({
  DOMAIN: JSON.stringify(process.env.DOMAIN || 'http://localhost:3000')
});

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractTextPluginConfig = new ExtractTextPlugin('[name].css');

module.exports = {
  entry: {
    app: './src/frontend/index.js',
    login: './src/frontend/login.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: ['transform-object-rest-spread']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(jpg|jpeg|gif|png|otf)$/,
        use: {
          loader: 'file-loader'
        }
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
  plugins: [
    WebpackDefinePlugin,
    HTMLWebackPluginMainPageConfig,
    HTMLWebackPluginLoginPageConfig,
    ExtractTextPluginConfig
  ],
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    alias: {
      styles: 'css',
      assets: 'assets',
      api: 'api',
      reducers: 'src/frontend/reducers',
      actions: 'src/frontend/actions'
    }
  }
};
