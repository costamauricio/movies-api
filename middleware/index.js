'use strict';

const compose = require('koa-compose');
const body = require('./body');
const error = require('./error');

module.exports = function() {

  return compose([
    body(),
    error()
  ]);
};
