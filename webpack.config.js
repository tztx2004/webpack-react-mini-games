const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const refreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
  name: 'mini-games',
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  entry: {
    app: './client',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            'react-refresh/babel',
            '@emotion/babel-plugin',
          ],
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
    new refreshWebpackPlugin(),
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
    filename: 'app.js',
  },
  devServer: {
    port: 3000,
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true,
    historyApiFallback: true,
  },
};
