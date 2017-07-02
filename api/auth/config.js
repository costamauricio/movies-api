'use strict';

module.exports = Object.freeze({
  secret: process.env.TOKEN_SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION || 86400,
  refreshTokenExpiration: process.env.REFRESH_TOKEN_EXPIRATION || 172800
});
