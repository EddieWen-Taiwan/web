const webpack = require('webpack');
const styleLintPlugin = require('stylelint-webpack-plugin');
const base = require('./webpack.config');

module.exports = {
	entry: [
		'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
		base.entry
	],
	output: base.output,
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				include: /src/,
				loader: 'eslint-loader',
			},
		],
		loaders: base.module.loaders.concat(base.module.cssLoader),
	},
	postcss: base.postcss,
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new styleLintPlugin({
			configFile: '.stylelintrc.json',
			files: [
				'src/css/*.css',
				'src/css/**/*.css'
			],
		}),
	],
	eslint: {
		configFile: '.eslintrc.json',
	},
	devtool: 'eval',
}
