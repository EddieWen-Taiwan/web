# Web Starter Kit

## Installation

~~~bash
$ git clone https://github.com/EddieWen-Taiwan/web.git
$ cd web
$ npm install

$ npm run dev
~~~

## Note

* dev server: `node.js` + `Koa.js`  

* middleware: `koa-webpack-dev-middleware` + `koa-webpack-hot-middleware` + `webpack-module-hot-accept`  

* view engine: `pug`  
> But `pug-loader` is not yet ready, so it uses npm script - `prebuild` to compile .pug to .html.

* linter: `eslint` + `stylelint`
