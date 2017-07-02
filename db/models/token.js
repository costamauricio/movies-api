'use strict';

const Basic = require('./basic');

/**
 * Definição do model dos tokens
 */
class Token extends Basic {

  constructor() {
    super();
  }

  static table() {
    return 'tokens';
  }

  get token() {
    return this.fields.token;
  }

  set token(token) {
    this.fields.token = token;
  }

  get userId() {
    return this.fields.user_id;
  }

  set userId(userId) {
    this.fields.user_id = userId;
  }
}

module.exports = Token;
