'use strict';

const compose = require('koa-compose');
const convert = require('koa-convert');
const cors = require('koa-cors');
const body = require('./body');
const query = require('./query');
const error = require('./error');
const output = require('./output');

module.exports = function() {

  return compose([
    convert(cors()),
    body(),
    query(),
    error(),
    output()
  ]);
};
