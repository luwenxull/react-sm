const path = require('path');

module.exports = function() {
  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      test: './browser/test.ts',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'browser'),
    },
    resolve: {
      extensions: ['.js', '.ts']
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
