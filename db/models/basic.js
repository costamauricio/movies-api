'use strict';

const db = require('../index.js');

/**
 * Define as funções básicas do model
 */
class BasicModel {

  constructor() {
    this.fields = {
      id: null
    }
  }

  get id() {
    return this.fields.id;
  }

  set id(id) {
    this.fields.id = id;
  }

  static table() {
    return '';
  }

  /**
   * Retorna uma collection representando os registros do banco
   *
   * @param {Object} conditions - Objecto chave: valor
   * @param {integer} limit
   */
  static find(conditions = null, limit = null) {

    return new Promise((resolve, reject) => {

      let sql = `select * from ${this.table()}`;

      if (conditions) {
        sql = `${sql} where ` + Object.keys(conditions).map((key) => {
          return `${key} ?`;
        }).join(' and ');
      }

      if (limit)
        sql = `${sql} limit ${limit}`;

      db.query(sql, (conditions ? Object.values(conditions) : []))
        .then((data) => {

          let result = [];

          /**
           * Caso não encontre nenhum registro
           */
          if (!data.length)
            return resolve(result);

          result = data.map((row) => {

            /**
            * Cria o model que esta manipulando e popula com os dados
            */
            let ob = new this();

            Object.keys(row).forEach((prop) => {
              ob[prop] = row[prop];
            });

            return ob;
          });

          resolve(result);
        })
        .catch(reject);

    });
  }

  /**
   * Retorna um model representando o registro do banco
   *
   * @param {integer} id - ID do registro
   * @param {Object} conditions - Objecto chave: valor
   */
  static findOne(id = null, conditions = null) {

    return new Promise((resolve, reject) => {

      if (id)
        conditions = { 'id = ': id };

      this.find(conditions, 1)
        .then((data) => {

          if (!data.length)
            return resolve(null);

          resolve(data[0]);
        })
        .catch(reject);
    })
  }

  /**
   * Salva os dados do model
   */
  save() {

    return new Promise((resolve, reject) => {

      let fields = this.fields;

      if (fields.id) {

        db.update(this.constructor.table(), fields, { 'id =': this.id })
          .then((result) => {
            resolve(this);
          })
          .catch(reject);
      } else {

        db.insert(this.constructor.table(), fields)
          .then((result) => {
            this.id = result.insertId;
            resolve(this);
          })
          .catch(reject);
      }

    });
  }

  /**
   * Remove o registro
   */
  remove() {

    return new Promise((resolve, reject) => {

      if (!this.id)
        reject();

      let sql = `delete from ${this.constructor.table()} where id = ?`;

      db.query(sql, [this.id])
        .then((data) => {

          this.id = null;
          resolve(this);
        })
        .catch(reject);
    });
  }
}

module.exports = BasicModel;
