const Router = require('koa-router');

module.exports = () => {

	const router = new Router();

	router.get( '/', (ctx, next) => {

		ctx.body = 'Hello, Koa@2';

	}).get( '/demo', (ctx, next) => {

		ctx.render('demo');

	});

	return router;

};
