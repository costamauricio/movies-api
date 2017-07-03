'use strict';

const passport = require('koa-passport');
const passportJwt = require('passport-jwt');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');
const config = require('./config');
const Token = require('../../db/models/token');

var params = {
  secretOrKey: config.secret,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader()
};

var strategy = new passportJwt.Strategy(params, function(payload, done) {

  /**
   * Verifica se o token de acesso é um token válido
   */
  Token.findOne(null, {'user_id =': payload.id})
    .then((token) => {

      if (!token)
        done(null, false);

      done(null, { id: payload.id });
    })
    .catch((err) => {
      done(null, false);
    });
});

passport.use(strategy);

module.exports = {
  /**
   * Inicializa
   */
  initialize() {
    return passport.initialize();
  },

  /**
   * Autoriza
   */
  authorize() {
    return passport.authenticate("jwt", { session: false });
  },

  /**
   * Gera um token para o usuário
   *
   * @param {Object} user
   */
  generateToken(user) {
    return jwt.encode({ id: user.id, email: user.email }, config.secret);
  },

  /**
   * Crypt a password before store on the database
   *
   * @param {string} password
   */
  cryptPassword(password) {

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 5)
        .then((hash) => {
          resolve(hash);
        })
        .catch(reject);
    });
  },

  /**
   * Compare a plain text password with a hash
   *
   * @param {string} password - Plain text password
   * @param {string} hash - Hash
   */
  comparePassword(password, hash) {

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hash)
        .then((res) => {
          resolve(res);
        })
        .catch(reject);
    });
  }
};
