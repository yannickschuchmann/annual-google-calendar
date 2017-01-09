const path = require('path');
const webpack = require('webpack');
module.exports = {
  context: path.resolve(__dirname, './src'),
  resolve: {
    modules: [path.resolve(__dirname, './src'), 'node_modules']
  },
  externals: {
    gapi: "gapi"
  },
  entry: {
    app: './app.jsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    publicPath: '/assets',
    library: 'CalendarApp',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }],
      },

      // Loaders for other file types can go here
    ],
  }
};
