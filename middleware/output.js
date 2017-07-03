'use strict';

const boom = require('koa-boom')();

/**
 * Middleware para padronizar a saída
 */
module.exports = function() {

  return async (ctx, next) => {
    await next();

    if (ctx.status != 200)
      return;

    ctx.body = JSON.stringify({
        data: ctx.body || ''
      });
  };
};
