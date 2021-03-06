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
   *
   * @param {string} sql
   * @param {array} fields
   * @returns {Promise}
   */
  query(sql, fields = []) {

    return new Promise((resolve, reject) => {

      global.connection.getConnection((err, connection) => {

        if (err)
          reject(err);
        connection.query(sql, fields, (err, result, fields) => {

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
  },

  /**
   * Atualiza um registro em uma tabela
   */
  update(tableName, fields, conditions = {}) {

    return new Promise((resolve, reject) => {

      global.connection.getConnection((err, connection) => {

        if (err)
          reject(err);

        let sql = `update ${tableName} set `;

        sql = sql + Object.keys(fields).map((field) => {
          return `${field} = ?`;
        }).join(', ');

        sql = `${sql} where ` + Object.keys(conditions).map((condition) => {
          return `${condition} ?`;
        }).join(' and ');

        connection.query(sql, Object.values(fields).concat(Object.values(conditions)), (err, result, fields) => {

          connection.release();

          if (err)
            reject(err);

          resolve(result);
        });

      });
    });
  }
}
