const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // where the output is placed
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 'babel-loader' is used to transpile es2015 and jsx into JS.
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc)ss$/,
        // loaders are executed from right to left.
        // 'style-loader' is used to inject style tag into the DOM.
        // 'css-loader' is used to replace '@import' and 'url()'
        // to import/require().
        // 'sass-loader' compiles sass/scss into css
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  }
};
