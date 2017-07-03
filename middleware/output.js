'use strict';

/**
 * Middleware para padronizar a saída
 */
module.exports = function() {

  return async (ctx, next) => {
    await next();
    //
    // return JSON.stringify(
    //   {
    //     data: ctx.body || '',
    //     statusCode: ctx.status
    //   }
    // );
  };
};
