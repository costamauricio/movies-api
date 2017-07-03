'use strict';

module.exports = Object.freeze({
  secret: process.env.TOKEN_SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION
});
