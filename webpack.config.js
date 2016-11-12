var webpack = require('webpack');

module.exports = {
  entry: './handler.js',
  target: 'node',
  node: {
    __dirname: false
  },
  externals: [
    'aws-sdk'
  ],
  resolve: {
    extensions: ['', '.js']
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['latest', 'stage-0']
        }
      }
    ]
  }
};
