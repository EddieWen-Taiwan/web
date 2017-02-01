import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import base from './webpack.config.babel';

import folder from './randomName';

const webpackBuildConfig = {
	entry: base.entry,
	output: Object.assign(base.output, {
		path: path.join(base.output.path, folder),
		publicPath: `${base.output.publicPath}${folder}/`,
	}),
	module: {
		rules: base.module.rules.concat(
			Object.assign(base.module.cssRule, {
				use: ExtractTextPlugin.extract({
					fallbackLoader: base.module.cssRule.use.style,
					loader: `${base.module.cssRule.use.css}!${base.module.cssRule.use.postcss}`,
				})
			})
		),
	},
	plugins: [
		base.plugins.htmlWebpakcPlugin,
		base.plugins.loaderOptionsPlugin,
		new webpack.optimize.CommonsChunkPlugin({
			name: 'bundle',
			filename: '[name].[hash:5].js',
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
		}),
		new ExtractTextPlugin({
			filename: '[name].[chunkhash:5].css',
		}),
	],
	devtool: 'source-map',
};

export default webpackBuildConfig;
