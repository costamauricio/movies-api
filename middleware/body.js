'use strict';

const asyncBusboy = require('async-busboy');

/**
 * Middleware para parse dos parametros do body
 */
module.exports = function() {
  return async (ctx, next) => {

    try {
      const {files, fields} = await asyncBusboy(ctx.req);
      ctx.request.files = files;
      ctx.request.fields = fields;
    } catch (err) {

    }
    
    await next();
  };
};
