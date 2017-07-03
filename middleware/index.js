'use strict';

const compose = require('koa-compose');
const body = require('./body');
const error = require('./error');
const output = require('./output');

module.exports = function() {

  return compose([
    body(),
    error(),
    output()
  ]);
};
