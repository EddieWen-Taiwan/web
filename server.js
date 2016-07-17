const ip = require('ip');
const webpack = require('webpack');
const WebpackDevMiddleware = require('koa-webpack-dev-middleware');
const WebpackHotMiddleware = require('koa-webpack-hot-middleware');
const config = require('./webpack.config.js');
const Koa = require('koa');
const Router = require('koa-router');
const Pug = require('koa-pug');

/**
 * Settings
 */
const port = 8080;
const app = new Koa();
const router = new Router();
router.get( '/', (ctx, next) => {
	ctx.body = 'Hello, Koa@2';
}).get( '/demo', (ctx, next) => {
	ctx.render('demo');
});
const pug = new Pug({
	viewPath: './src/views',
	debug: false,
	pretty: false,
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

app.use( router.routes() );
app.use( webpackDevMiddleware );
app.use( webpackHotMiddleware );

/**
 * Server Go~
 */
app.listen( port, function() {
	console.log(`Example app listening on port ${port}`);
	console.log(`Public visit from             http://${ip.address()}:${port}\n`);
});
