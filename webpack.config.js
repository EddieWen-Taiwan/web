const path = require('path');
const webpack = require('webpack');
const cssnext = require('postcss-cssnext');
const customProperties = require('postcss-custom-properties');
const mixins = require('postcss-mixins');
const extend = require('postcss-extend');
const autoAndMark = require('./postcss-auto-and-mark');
const HtmlWebpakcPlugin = require('html-webpack-plugin');
const globalCss = require('./global.css.json');

module.exports = {
	entry: path.join(__dirname, 'src', 'app.js'),
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/',
		filename: '[name].[hash:5].js',
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: /src/,
				loader: 'babel-loader',
			}, {
				test: /\.(png|jpg)$/,
				include: /src\/image/,
				loader: 'url-loader?limit=10000&name=[name].[hash:5].[ext]',
			}, {
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader?name=[name].[hash:5].[ext]',
			}, {
				test: /\.pug$/,
				include: /src\/views/,
				loader: 'pug-loader',
			},
		],
		cssLoader: {
			test: /\.css$/,
			include: /src\/css/,
			loader: {
				style: 'style-loader',
				css: 'css-loader!postcss-loader',
			},
		},
	},
	plugins: {
		htmlWebpakcPlugin: new HtmlWebpakcPlugin({
			template: 'src/views/demo.pug',
			inject: 'body',
			filename: process.env.NODE_ENV === 'production' ? '../demo.html' : 'demo.html',
			// favicon: 'src/images/favicon.png',
			minify: {
				collapseBooleanAttributes: true,
				collapseWhitespace: true,
				minifyCSS: true,
				minifyJS: true,
				quoteCharacter: '\'',
				removeComments: true,
				removeEmptyAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
			},
		}),
	},
	postcss: [
		customProperties({
			variables: globalCss,
		}),
		autoAndMark(),
		mixins(),
		extend(),
		cssnext(),
	],
}
