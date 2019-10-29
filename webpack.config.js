const path = require('path');

module.exports = function() {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      options: './src/options.jsx',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'extension'),
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-typescript'],
            }
          }
        },
      ]
    },
  }
};
