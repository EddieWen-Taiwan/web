const ip = require('ip');

const webpack = require('webpack');
const WebpackDevMiddleware = require('koa-webpack-dev-middleware');
const WebpackHotMiddleware = require('koa-webpack-hot-middleware');
const config = require('./webpack.config.dev');

const Koa = require('koa');
const Pug = require('koa-pug');
const serve = require('koa-static');

/**
 * Settings
 */
const port = 8080;
const app = new Koa();

const pug = new Pug({
	viewPath: './src/views',
	debug: false,
	pretty: false,
	noCache: true,
	app: app,
});

const compiler = webpack(config);
const webpackDevMiddleware = new WebpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	noInfo: true,
	// stats: { colors: true },
});
const webpackHotMiddleware = new WebpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
});
app.use( webpackDevMiddleware );
app.use( webpackHotMiddleware );

const router = require('./devRouter')();
app.use( router.routes() );

app.use( serve('build') );

/**
 * Server Go~
 */
app.listen( port, () => {
	console.log('\nDEV SERVER is running.\n');
	console.log(`Example app listening on port ${port}`);
	console.log(`Public visit from             http://${ip.address()}:${port}\n`);
});
