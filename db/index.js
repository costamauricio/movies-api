'use strict';

const mysql = require('mysql');

module.exports = {
  /**
   * Conecta na base de dados
   */
  connect(host, port, user, password, database) {

    return new Promise((resolve, reject) => {

      let conn = mysql.createPool({
        connectionLimit: 10,
        host: host,
        port: port,
        user: user,
        password: password,
        database: database
      });

      /**
       * Verifica se a conexão é valida
       */
      conn.getConnection((err, connection) => {

        if (err)
          return reject(err);

        connection.release();
        global.connection = conn;
        resolve();
      });

    });
  }

}
