'use strict';

const Basic = require('./basic');

/**
 * Definição do model dos usuários
 */
class User extends Basic {

  constructor() {
    super();
  }

  static table() {
    return 'users';
  }

  get name() {
    return this.fields.name;
  }

  set name(name) {
    this.fields.name = name;
  }

  get email() {
    return this.fields.email;
  }

  set email(email) {
    this.fields.email = email;
  }

  get password() {
    return this.fields.password;
  }

  set password(password) {
    this.fields.password = password;
  }
}

module.exports = User;
