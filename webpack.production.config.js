const path = require('path');
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
	resolve: {
		extensions: ['.json', '.js'],
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.join(__dirname, '/dist/'),
		inline: true,
		host: 'localhost',
		port: 9000,
	},
};