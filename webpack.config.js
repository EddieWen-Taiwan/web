const path = require('path');
const webpack = require('webpack');
const styleLintPlugin = require('stylelint-webpack-plugin');

const hotMiddleware = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';

module.exports = {
	entry: [ hotMiddleware, path.resolve(__dirname, 'src', 'app.js') ],
	output: {
		path: path.resolve(__dirname, 'build', 'assets'),
		publicPath: '/assets/',
		filename: 'bundle.min.js'
	},
	module: {
		preLoaders: [
			{ test: /\.js$/, include: /src/, loader: 'eslint-loader' },
		],
		loaders: [
			{
				test: /\.js$/,
				include: /src/,
				loaders: [ 'babel-loader', 'webpack-module-hot-accept' ],
			}, {
				test: /\.css$/,
				include: /src\/css/,
				loader: 'style-loader!css-loader!postcss-loader',
			}, {
				test: /\.(png|jpg)$/,
				include: /src/,
				loader: 'file-loader',
				query: 'name=img/[hash:7].[ext]',
			}, {
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				include: /src/,
				loader : 'file-loader',
				query: 'name=fonts/[hash:9].[ext]',
			},
		]
	},
	resolve: {
		root: path.resolve(__dirname, 'src'),
		extensions: ['', '.js', '.css'],
		alias: {},
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new styleLintPlugin({
			files: 'src/css/**/*.css'
		}),
	],
	postcss: (webpack) => {
		return [
			require('precss')(),
			require('postcss-cssnext')(),
		];
	},
	eslint: {
		configFile: '.eslintrc',
	},
	devtool: 'eval',
}
