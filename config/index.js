'use strict';

module.exports = Object.freeze({
  environment: process.env.NODE_ENV || 'development',
  server: {
    host: '0.0.0.0',
    port: process.env.NODE_PORT || process.env.PORT || 8081
  },
  db: {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWD,
    name: process.env.MYSQL_DB_NAME
  }
});
