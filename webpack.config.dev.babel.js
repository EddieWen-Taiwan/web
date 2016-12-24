import webpack from 'webpack';
import styleLintPlugin from 'stylelint-webpack-plugin';
import base from './webpack.config.babel';
import dev from './devConfig.json';

const webpackDevConfig = {
	entry: [
		`webpack-dev-server/client?http://localhost:${dev.port}`,
		'webpack/hot/dev-server',
		base.entry,
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
		loaders: base.module.loaders.concat(
			Object.assign(base.module.cssLoader, {
				loader: `${base.module.cssLoader.loader.style}!${base.module.cssLoader.loader.css}`,
			})
		),
	},
	postcss: base.postcss,
	plugins: [
		base.plugins.htmlWebpakcPlugin,
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
};

export default webpackDevConfig;
