const path = require('path');
const styleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, 'src', 'app.js'),
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: 'http://localhost:8080/',
		filename: 'bundle.min.js'
	},
	module: {
		preLoaders: [
			{ test: /\.js$/, include: /src/, loader: 'eslint-loader' }
		],
		loaders: [
			{ test: /\.js$/, include: /src/, loader: 'babel-loader' },
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{ test: /\.(png|jpg)$/, loader: 'file-loader', query: 'name=img/[hash:7].[ext]' }
		]
	},
	resolve: {
		root: path.resolve(__dirname, 'src'),
		extensions: ['', '.js', '.css'],
		alias: {}
	},
	plugins: [
		new styleLintPlugin({
			files: 'src/css/**/*.css'
		})
	],
	eslint: {
		configFile: '.eslintrc'
	}
}
