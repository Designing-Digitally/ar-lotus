const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
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
};