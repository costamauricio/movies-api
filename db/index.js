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
  },

  /**
   * Executa uma query e retorna o resultado
   */
  query(sql) {

    return new Promise((resolve, reject) => {

      global.connection.getConnection((err, connection) => {

        if (err)
          reject(err);

        connection.query(sql, (err, result, fields) => {

          connection.release();

          if (err)
            reject(err);

          resolve(result);
        });

      });
    });
  },

  /**
   * Insere um registro em uma tabela
   */
  insert(tableName, fields) {

    return new Promise((resolve, reject) => {

      global.connection.getConnection((err, connection) => {

        if (err)
          reject(err);

        connection.query(`insert into ${tableName} set ?`, fields, (err, result, fields) => {

          connection.release();

          if (err)
            reject(err);

          resolve(result);
        });

      });
    });
  }

}
