// See: https://codingkobin.medium.com/using-webpack-and-babel-with-vanilla-javascript-29461e8777a7
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry:{
    main: "./src/main.js",
    user: "./src/user.js"
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "[name]-[contenthash].js",
  },
  mode: "development",
  module: {
    rules: [ 
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          }
        ]
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    watchFiles: path.join(__dirname, 'dist'),
    port: 8080,
    hot: true,
    compress: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "src/index.html"
    })
  ]

}