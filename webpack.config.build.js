const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpakcPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.config');

module.exports = {
	entry: base.entry,
	output: base.output,
	module: {
		loaders: [
			{
				test: /\.pug$/,
				include: /src\/views/,
				loader: 'pug-loader',
			}, {
				test: /\.js$/,
				include: /src/,
				loader: 'babel-loader',
			}, {
				test: /\.css$/,
				include: /src\/css/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader'),
			}, {
				test: /\.(png|jpg)$/,
				include: /src/,
				loader: 'file-loader',
				query: 'name=img/[hash:7].[ext]',
			}, {
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				include: /src/,
				loader: 'file-loader',
				query: 'name=fonts/[hash:9].[ext]',
			},
		]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
		new ExtractTextPlugin('all.min.css'),
		new HtmlWebpakcPlugin({
			template: 'src/views/demo.pug',
			inject: false,
			filename: '../demo.html',
			minify: {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				quoteCharacter: '\'',
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
			},
		}),
		new OptimizeCssAssetsPlugin({
			assetNameRegExp: /\.min\.css$/,
		}),
	],
	postcss: (webpack) => {
		return [
			require('precss')({
				variables: require('./src/css/palette'),
			}),
			require('postcss-cssnext')(),
		];
	},
	devtool: 'source-map',
}
