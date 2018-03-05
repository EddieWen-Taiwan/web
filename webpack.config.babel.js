import path from 'path';
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';
import customProperties from 'postcss-custom-properties';
import mixins from 'postcss-mixins';
import extend from 'postcss-extend';
import HtmlWebpakcPlugin from 'html-webpack-plugin';
import globalCss from './global.css.json';

const webpackBaseConfig = {
	entry: path.join(__dirname, 'src', 'app.js'),
	output: {
		path: path.join(__dirname, 'build'),
		publicPath: '/',
		filename: '[name].[hash:5].js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /src/,
				use: 'babel-loader',
			}, {
				test: /\.(png|jpg)$/,
				include: /src\/image/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[hash:5].[ext]'
				},
			}, {
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader',
				options: {
					name: '[name].[hash:5].[ext]',
				},
			}, {
				test: /\.pug$/,
				include: /src\/views/,
				use: 'pug-loader',
			},
		],
		cssRule: {
			test: /\.css$/,
			include: /src\/css/,
			use: {
				style: 'style-loader',
				css: 'css-loader',
				postcss: 'postcss-loader',
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
		loaderOptionsPlugin: new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [
					customProperties({
						variables: globalCss,
					}),
					mixins(),
					extend(),
					cssnext(),
				],
			},
		}),
	},
};

export default webpackBaseConfig;
