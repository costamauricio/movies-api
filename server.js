'use strict';

const Koa = require('koa');
const mount = require('koa-mount');
const koaStatic = require('koa-static');
const logger = require('koa-logger');
const api = require('./api');

const app = new Koa();

app.use(logger());
app.use(mount(api));
app.use(koaStatic('./docs'));

module.exports = app;
