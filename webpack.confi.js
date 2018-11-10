const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const javascript = {
  test: /\.(js)$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader',
    options: { presets: ['env'] }
  }],
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() { return [autoprefixer({ browsers: 'last 3 versions' })]; }
  }
};

const styles = {
  test: /\.(scss)$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
      }
    },
    "css-loader?sourceMap",
    postcss,
    'sass-loader?sourceMap'
  ]
};

const ugfy = new UglifyJsPlugin({
  test: /\.js(\?.*)?$/,
  parallel: true
});

const config = {
  entry: {
    app: './public/js/index.js'
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: 'main.js'
  },

  module: {
    rules: [javascript, styles]
  },
  plugins: [
    ugfy,
    new MiniCssExtractPlugin({
      filename: "style.css"
    })
  ]
};
process.noDeprecation = true;

module.exports = config;

