const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const server = new WebpackDevServer( webpack(config), {
	contentBase: './build',
	publicPath: config.output.publicPath,
	hot: true,
	// noInfo: true,

	stats: { colors: true }
});

const ip = 'localhost';
const port = 8080;

server.listen( port, ip, function(err) {

	if( err ) {
		return console.log(err);
	}

	console.log('Listening at http://' + ip + ':' + port);

});
