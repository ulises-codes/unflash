const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
    clean: true,
  },
  devtool:
    process.env.NODE_ENV === 'development' ? 'inline-source-map' : undefined,
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './manifest.json',
          to: './manifest.json',
          context: 'src',
        },
      ],
    }),
  ],
};
