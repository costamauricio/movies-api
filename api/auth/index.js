'use strict';

const passport = require('koa-passport');
const passportJwt = require('passport-jwt');
const config = require('./config');

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
  initialize() {
    return passport.initialize();
  },

  authorize() {
    return passport.authenticate("jwt", config.secret);
  }
};
