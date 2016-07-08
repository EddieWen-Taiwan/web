const path = require('path');
const webpack = require('webpack');
const styleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	entry: [ path.resolve(__dirname, 'src', 'app.js'), 'webpack-dev-server/client?http://localhost:8080/', "webpack/hot/dev-server" ],
	output: {
		path: path.resolve(__dirname, 'build', 'assets'),
		publicPath: 'http://localhost:8080/assets/',
		filename: 'bundle.min.js'
	},
	module: {
		preLoaders: [
			{ test: /\.js$/, include: /src/, loader: 'eslint-loader' },
		],
		loaders: [
			{ test: /\.js$/, include: /src/, loader: 'babel-loader' },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.(png|jpg)$/, loader: 'file-loader', query: 'name=img/[hash:7].[ext]' },
			{ test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, loader : 'file-loader', query: 'name=fonts/[hash:9].[ext]' },
		]
	},
	resolve: {
		root: path.resolve(__dirname, 'src'),
		extensions: ['', '.js', '.css'],
		alias: {},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new styleLintPlugin({
			files: 'src/css/**/*.css'
		}),
	],
	eslint: {
		configFile: '.eslintrc',
	},
	devtool: 'eval',
}
