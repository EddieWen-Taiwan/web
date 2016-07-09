/**
 * Include webpack....
 */
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./webpack.config');
const compiler = webpack(config);

/**
 * node.js framework - `Express.js`
 * next: `Koa`
 */
const express = require('express');
const app = express();
/**
 * View Engine: Pug(Jade)
 */
app.set( 'view engine', 'pug' );
app.set( 'views', './src/views' );
app.use( express.static('./build') );
app.use( WebpackDevMiddleware(compiler, {
	publicPath: config.output.publicPath,
	noInfo: true,
	// stats: { colors: true },
}) );
app.use( WebpackHotMiddleware(compiler, {
	log: console.log,
	path: '/__webpack_hmr',
}) );

/**
 * Express routing
 */
app.get('/', function(req, res) {
	res.send('Hello, Express.js!');
});

const port = 8080;

app.listen( port, function() {
	console.log(`Example app listening on port http://localhost:${port}!`);
});
