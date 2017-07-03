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

  static find(fields = {}, conditions = {}, limit = null) {

  }

  /**
   * Retorna um model representando o registro do banco
   *
   * @param {integer} id - ID do registro
   * @param {Object} conditions - Objecto chave: valor
   */
  static findOne(id = null, conditions = null) {

    return new Promise((resolve, reject) => {

      let sql = `select * from ${this.table()}`,
          and = '';

      if (id)
        sql = `${sql} where id = ${id}`;

      if (conditions) {
        sql = `${sql} where `;

        Object.keys(conditions).forEach((key) => {
          sql = `${sql}${and}${key} ?`;
          and = ' and ';
        });
      }

      db.query(sql + ' limit 1', (conditions ? Object.values(conditions) : []))
        .then((data) => {

          /**
           * Caso não encontre nenhum registro
           */
          if (!data.length)
            return resolve(null);

          /**
           * Cria o model que esta manipulando e popula com os dados
           */
          let ob = new this();

          Object.keys(data[0]).forEach((prop) => {
            ob[prop] = data[0][prop];
          });

          resolve(ob);
        })
        .catch(reject);

    });
  }

  /**
   * Salva os dados do model
   */
  save() {

    return new Promise((resolve, reject) => {

      let fields = this.fields;
      delete fields.id;

      db.insert(this.constructor.table(), fields)
        .then((result) => {
          this.id = result.insertId;
          resolve(this);
        })
        .catch(reject);
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
