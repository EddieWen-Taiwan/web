const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'app.js'),
	output: {
		path: path.resolve(__dirname, 'build', 'assets'),
		publicPath: '/assets/',
		filename: 'bundle.min.js'
	},
	module: {
		loaders: [
			{ test: /\.js$/, include: /src/, loader: 'babel-loader' },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
			{ test: /\.(png|jpg)$/, loader: 'file-loader', query: 'name=img/[hash:7].[ext]' },
			{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader : 'file-loader', query: 'name=fonts/[hash:9].[ext]' },
		]
	},
	resolve: {
		root: path.resolve(__dirname, 'src'),
		extensions: ['', '.js', '.css'],
		alias: {}
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		new ExtractTextPlugin('all.min.css'),
	],
	devtool: 'source-map',
}
