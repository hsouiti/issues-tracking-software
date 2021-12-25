const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { root } = require('postcss')

let mode = 'development'
if (process.env.NODE_ENV) {
  mode = process.env.NODE_ENV.trim()
}
const isProduction = process.env.NODE_ENV === 'production'
module.exports = {
  mode,
  entry: path.resolve(__dirname, 'frontend/src/js', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'frontend/public'),
    filename: 'main.js',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'frontend/src', 'index.html'),
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devtool: 'source-map',
  devServer: {
    static: path.resolve(__dirname, 'public'),
    hot: true,
    compress: true,
    open: true,
    proxy: {
      '/api': 'http://localhost:3500',
    },
  },
}
