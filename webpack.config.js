/* Webpack config that's going to compile our React from JSX to usable JS code, 
use style-loader to load CSS, use the HTML plugin to generate a valid HTML for us, 
and make sure it's all living in one bundle so our React Flight protocol can find client side components in the bundle. */

const path = require("node:path"); //common js imports

//u need ur bundle to be bundled correctly for our rscs and you need ur sever to run this as well
const HtmlWebpackPlugin = require("html-webpack-plugin"); //make the html shell and injects js/css into it
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin"); //plugin for supporting rsc with webpack

// sets the build mode either to "development" or "production" based on the environment
const mode = process.env.NODE_ENV || "development";
const development = mode === "development";

const config = {
  mode,

  // the main file webpack starts bundling from
  entry: "./src/Client.jsx",

  module: {
    rules: [
      //uses babel to transpile moder jsx to browser-compatible-js
      {
        test: /\.jsx?$/, //look for anything that ends with jsx - x might not be there => so anything ending with js or jsx
        use: "babel-loader",
        exclude: /node_modules/,
      },

      // loads css files and injects them into the dom
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // allows us to import files without specifying js or jsx extensions
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    // generates html file based on index.html, injects js/css and sets the public path
    new HtmlWebpackPlugin({
      inject: true,
      publicPath: "/assets/",
      template: "./index.html",
    }),

    //enables support for rsc on client bundle
    new ReactServerWebpackPlugin({ isServer: false }),
  ],
  // how code-split chunks are named (with content hash in production for cache busting)
  //output directory for build
  //name for the main bundle
  //cleans the output directory before each build
  output: {
    chunkFilename: development
      ? "[id].chunk.js"
      : "[id].[contenthash].chunk.js",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
  },

  //extracts the webpack runtime into a single chunk for better long-term caching
  optimization: {
    runtimeChunk: "single",
  },
};

module.exports = config;
