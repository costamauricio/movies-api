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

  static table() {
    return '';
  }

  static find(fields = {}, conditions = {}, limit = null) {

  }

  /**
   * Retorna um model representando o registro do banco
   */
  static findOne(id = null, conditions = {}) {

    return new Promise((resolve, reject) => {

      let sql = `select * from ${this.table()}`;

      if (id)
        sql = `${sql} where id = ${id}`;

      db.query(sql + ' limit 1')
        .then((data) => {

          let ob = new this();

          Object.keys(data[0]).forEach((prop) => {
            ob[prop] = data[0][prop];
          });

          resolve(ob);
        })
        .catch((err) => {
          reject(err);
        });

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
        .catch((err) => {
          reject(err)
        });
    });
  }
}

module.exports = BasicModel;
