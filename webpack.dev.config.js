const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: path.join(__dirname, './src/*.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'bundle.js',
		chunkFilename: '[name].js',
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
					{ from: './src/models/', to: 'models' },
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
		port: 9000,
		devMiddleware:{
			index: 'index.html',
			writeToDisk: true,
		},
	},
};