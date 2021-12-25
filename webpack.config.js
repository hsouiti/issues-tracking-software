const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: devMode,
  entry: path.resolve(__dirname, 'frontend', 'app.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name]_bundle.js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: ['babel-loader'],
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
}
