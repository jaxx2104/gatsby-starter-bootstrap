const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"],
        include: path.resolve(__dirname, '../')
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      '__PREFIX_PATHS__': '/',
      '__PATH_PREFIX__': '/'
    }),
    new FriendlyErrorsWebpackPlugin()
  ]
}
