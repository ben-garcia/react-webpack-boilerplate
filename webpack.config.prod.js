const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UgilifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  optimization: {
    // minimize js and css
    minimizer: [new UgilifyJsPlugin({}), new OptimizeCSSAssetsPlugin({})]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader']
      },
      {
        test: /\.(sa|sc)ss$/,
        include: path.resolve(__dirname, 'src'),
        // order is important
        // does from right to left.
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        // use 'html-loader' to minimize the html output
        use: [{ loader: 'html-loader', options: { minimize: true } }]
      }
    ]
  },
  plugins: [
    // creates html file to inject css and js.
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    // extracts css into seperate files.
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
