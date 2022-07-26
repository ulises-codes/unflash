const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    hidePageOnLoad: path.resolve(__dirname, './src/hidePageOnLoad.ts'),
    stop: path.resolve(__dirname, './src/stop.ts'),
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
      {
        test: /\.css$/i,
        use: [
          { loader: 'style-loader', options: { injectType: 'styleTag' } },
          'css-loader',
        ],
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
    new CopyPlugin({
      patterns: [
        {
          from: './assets/icons/',
          to: './assets/icons/',
          context: 'src',
        },
      ],
    }),
  ],
};
