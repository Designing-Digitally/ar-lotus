const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// TODO: USE NODE FS TO GET JS FILE IN SRC ROOT AND DYNAMICALLY ADD IT THE ENTRY

module.exports = {
	mode: 'development',
	entry: './src/app.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, './dist'),
		publicPath: '',
	},
	module: {
		rules: 
		[
			{
				test: /\.js?$/,
				include: [
					path.resolve(__dirname, 'app'),
				],
				exclude: [
					path.resolve(__dirname, 'node_modules'),
				],
				use:{
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/env'],
						],
					},
				},
			},
		],
	},
	plugins:[
		new HtmlWebpackPlugin(
			{
				template: path.resolve(__dirname, './src/index.html'),
				filename: 'index.html',
			}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin(
			{
				patterns: [
					{ from: './src/images/', to: 'images' },
					{ from: './src/videos/', to: 'videos' },
					{ from: './src/data/', to: 'data' },
				],
			}),
	],
	resolve: {
		extensions: ['.json', '.js'],
	},
	devtool: 'source-map',
	devServer: {
		server: 'https',
		static: {
			directory: path.resolve(__dirname, './dist'),
		},
		host: 'localhost',
		port: 9001,
		devMiddleware:{
			index: 'index.html',
			writeToDisk: true,
		},
	},
};