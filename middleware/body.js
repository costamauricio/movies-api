'use strict';

const asyncBusboy = require('async-busboy');

/**
 * Middleware para parse dos parametros do body
 */
module.exports = function() {
  return async (ctx, next) => {
    const {files, fields} = await asyncBusboy(ctx.req);
    ctx.request.files = files;
    ctx.request.fields = fields;
    await next();
  };
};
