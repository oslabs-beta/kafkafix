const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

// Instantiate the plugin.
// The `template` property defines the source
// of a template file that this plugin will use.
// We will create it later.
const htmlPlugin = new HtmlWebPackPlugin({
  template: './client/src/index.html',
});

module.exports = {
  mode: 'development',
  // Our application entry point.
  entry: './client/src/index.tsx',

  // These rules define how to deal
  // with files with given extensions.
  // For example, .tsx files
  // will be compiled with ts-loader,
  // a spcific loader for webpack
  // that knows how to work with TypeScript files.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [/node_modules/, path.resolve(__dirname, './testapp')],
      },
    ],
  },

  // Telling webpack which extensions
  // we are interested in.
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  // What file name should be used for the result file,
  // and where it should be palced.
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  // Use the html plugin.
  plugins: [htmlPlugin],
  // Set up the directory
  // from which webpack will take the static content.
  // The port field defines which port on localhost
  // this application will take.
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
