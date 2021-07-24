const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
	template: './client/src/index.html',
});

module.exports = {
	mode: 'development',
	entry: './client/src/index.tsx',
	target: 'electron-renderer',

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: [/node_modules/, path.resolve(__dirname, './testapp')],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [htmlPlugin],
	devServer: {
		proxy: {
			'/api': 'http://localhost:3000',
		},
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 8080,
	},
};
