'use strict';

const Koa = require('koa');
const mount = require('koa-mount');
const koaStatic = require('koa-static');
const logger = require('koa-logger');
const middleware = require('./middleware');
const api = require('./api');

const app = new Koa();

app.use(logger());
app.use(middleware());
app.use(mount(api));

module.exports = app;
