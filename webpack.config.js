const webpack = require('webpack');
const path = require('path');

module.exports = env => {

  const envKeys = Object.keys(env).reduce((acc, cur) => ({ ...acc, [`process.env.${cur}`]: JSON.stringify(env[cur]) }), {});

  return {
    mode: 'production',

    entry: {
      background: './src/background/background.js',
      content_scripts: './src/content_scripts/main.js',
      popup: './src/popup/popup.js'
    },

    output: {
      filename: '[name].js',
      path: __dirname + '/dist'
    },

    plugins: [
      new webpack.DefinePlugin(envKeys)
    ],

    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
      ]
    }

  };
};
