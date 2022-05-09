const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: path.join(__dirname, 'app', 'index'),
	watch: true,
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'bundle.js',
	},
	module: {
		rules: [{
			test: /.js?$/,
			include: [
				path.resolve(__dirname, 'app'),
			],
			exclude: [
				path.resolve(__dirname, 'node_modules'),
			],
			loader: 'babel-loader',
			query: {
				presets: [
					['@babel/env'],
				],
			},
		}],
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
};