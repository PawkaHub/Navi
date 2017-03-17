// Webpack configuration file
const resolve = require('path').resolve;

const ROOT_DIR = resolve('.');
const SRC_DIR = `${ROOT_DIR}/src`;

module.exports = {
  entry: './server.js',
  target: 'node',
  output: {
    path: resolve('./build'),
    filename: '[name].bundle.js',
    chunkFilename: '[hash].js',
    publicPath: 'build/',
  },
  resolve: {
    modules: [
      SRC_DIR,
      'node_modules',
    ],
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      query: {
        presets: [
          ['es2015', { modules: false }],
        ],
      },
    }],
  },
  devtool: '#source-map',
}
