/*eslint-env node*/
var path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    PATHS = {
      src: path.join(__dirname, 'src'),
      build: path.join(__dirname, 'build'),
      node_modules: path.join(__dirname, "node_modules")
    };

const plugins = [
  new HtmlWebpackPlugin({
    title: 'TODO',
    inject: true, // all javascript resources will be placed at the bottom of the body element
    template: path.join(PATHS.src, 'index.html')
  }),
  new webpack.DefinePlugin({
    __DEV__: true,
    __PROD__: false
  })
];

module.exports = {
  devtool: 'eval-source-map',
  entry: path.join(PATHS.src, "index.jsx"),
  output: {
    path: PATHS.build,
    // added webpack-dev-server for react-router
    // and have to add `publicPath` for a url prefix in react-router as well
    // ie. a url like "http://0.0.0.0:3000/foo/" rather than "http://0.0.0.0:3000/"
    publicPath: '/',
    filename: "bundle.js"
  },
  devServer: {
    // Enable history API fallback
    // so HTML5 History API based routing works
    historyApiFallback: true,
    inline: true,
    progress: true,
    // Display only errors to reduce the amount of output.
    stats: 'errors-only',
    // 0.0.0.0 is available to all network devices
    // unlike default localhost
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || '3000'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: PATHS.node_modules, loader: "babel-loader" }
    ]
  },
  plugins: plugins
};
