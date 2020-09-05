const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = env => {

  const envKeys = Object.keys(env).reduce((acc, cur) => ({ ...acc, [`process.env.${cur}`]: JSON.stringify(env[cur]) }), {});

  return {
    mode: "production",

    entry: {
      background: "./src/background/background.js",
      checkWordsLoop: "./src/background/checkWordsLoop.js",
      content_scripts: "./src/content_scripts/main.js",
      popup: "./src/popup/popup.js",
      dictionary: "./src/dictionary/dictionary.js"
    },

    output: {
      filename: "[name].js",
      path: __dirname + "/dist"
    },

    plugins: [
      new webpack.DefinePlugin(envKeys),
      new CopyPlugin({
        patterns: [
          "src/popup/popup.html",
          "src/dictionary/dictionary.html",
          "src/manifest.json"
        ]
      })
    ],

    module: {
      rules: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
        { test: /\.css$/i, use: [ "style-loader", "css-loader" ] },
        { test: /\.html$/i, loader: "html-loader" }
      ]
    }

  };
};
