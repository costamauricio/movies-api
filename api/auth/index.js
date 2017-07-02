'use strict';

const passport = require('koa-passport');
const passportJwt = require('passport-jwt');
const jwt = require("jwt-simple");
const config = require('./config');
const user = require('../../db/models/user');

var params = {
  secretOrKey: config.secret,
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeader()
};

var strategy = new passportJwt.Strategy(params, function(payload, done) {
  // var user = users[payload.id] || null;

  if (payload.id) {
    return done(null, {
      id: payload.id
    });
  } else {
    return done(new Error("User not found"), null);
  }
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
  }
};
