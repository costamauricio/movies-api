'use strict';

const compose = require('koa-compose');
const body = require('./body');
const query = require('./query');
const error = require('./error');
const output = require('./output');

module.exports = function() {

  return compose([
    body(),
    query(),
    error(),
    output()
  ]);
};
