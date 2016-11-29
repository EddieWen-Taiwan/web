const path = require('path');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const customProperties = require('postcss-custom-properties');
const mixins = require('postcss-mixins');
const extend = require('postcss-extend');
const globalCss = require('./global.css.json');

module.exports = {
	entry: path.join(__dirname, 'src', 'app.js'),
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle__[hash:7].min.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: /src/,
				loaders: [ 'babel-loader', 'webpack-module-hot-accept' ],
			}, {
				test: /\.(png|jpg)$/,
				include: /src\/image/,
				loader: 'url-loader?limit=10000&name=[name]__[hash:13].[ext]',
			}, {
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader : 'file-loader?name=[name]__[hash:7].[ext]',
			},
		],
		cssLoader: {
			test: /\.css$/,
			include: /src\/css/,
			loader: 'style-loader!css-loader!postcss-loader',
		},
	},
	plugins: [
	],
	postcss: [
		customProperties({
			variables: globalCss,
		}),
		mixins(),
		extend(),
		cssnext(),
	],
}
