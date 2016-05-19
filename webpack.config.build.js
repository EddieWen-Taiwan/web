const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'app.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: './',
		filename: 'bundle.min.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, include: /src/, loader: 'babel-loader' },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
			{ test: /\.(png|jpg)$/, loader: 'file-loader', query: 'name=img/[hash:7].[ext]' }
		]
	},
	resolve: {
		root: path.resolve(__dirname, 'src'),
		extensions: ['', '.js', '.css'],
		alias: {}
	},
	plugins: [
		new ExtractTextPlugin('all.min.css')
	]
}
