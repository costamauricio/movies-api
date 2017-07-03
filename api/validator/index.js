'use strict';

const joi = require('joi');
const boom = require('koa-boom')();

/**
 * Middleware para validação das rotas
 */
module.exports = function(rules) {
  return async (ctx, next) => {

    let errors = [];

    Object.keys(rules).forEach((origin) => {

      let values = null;

      switch(origin) {
        case 'body':
          values = ctx.request.fields;
          break;
        case 'query':
          values = ctx.request.query;
          break;
        case 'params':
          values = ctx.params;
          delete values['0'];
          break;
      }

      const {error, value} = joi.validate(values, rules[origin]);

      if (error)
        errors.push(error);
    });

    if (errors.length)
      boom.badRequest(ctx, errors.map((error) => {
        return error.details.map((detail) => {
          return detail.message;
        }).join("\n");
      }).join("\n"));

    await next();
  }
}
