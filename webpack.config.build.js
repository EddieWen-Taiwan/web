const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('./webpack.config');

const folder = Math.floor((new Date()).valueOf() * Math.random()).toString().substr(-7);

module.exports = {
	entry: base.entry,
	output: Object.assign(base.output, {
		path: path.join(base.output.path, folder),
		publicPath: `${base.output.publicPath}${folder}/`,
	}),
	module: {
		loaders: base.module.loaders.concat(
			Object.assign(base.module.cssLoader, {
				loader: ExtractTextPlugin.extract(
					base.module.cssLoader.loader.style,
					base.module.cssLoader.loader.css
				)
			})
		),
	},
	plugins: [
		base.plugins.htmlWebpakcPlugin,
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
			},
		}),
		new ExtractTextPlugin('[name].[chunkhash:5].css'),
	],
	postcss: base.postcss,
	devtool: 'source-map',
}
