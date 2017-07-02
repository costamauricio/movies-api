'use strict';

const Koa = require('koa');
const Router = require('koa-router');
const importDir = require('import-dir');
const auth = require('./auth');

const app = new Koa();

app.use(auth.initialize());

/**
 * Define as rotas padrões da API
 */
const router = new Router({
  prefix: '/api'
});

/**
 * Importa as rotas da API
 */
const routes = importDir('./routes');

Object.keys(routes).forEach(name => {
  router.use(routes[name].routes())
});

app.use(router.routes());

module.exports = app;
