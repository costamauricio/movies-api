'use strict';

const merge = require('merge-descriptors');
const qs = require('qs');

/**
 * Middleware para parse dos parametros via query string
 */
module.exports = function() {
  return async (ctx, next) => {

    merge(ctx.request, {
      get query() {
        return qs.parse(this.querystring);
      },

      set query(obj) {
        this.querystring = qs.stringify(obj);
      }
    });

    await next();
  };
};
