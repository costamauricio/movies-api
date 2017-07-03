'use-strict';

const Router = require('koa-router');
const boom = require('koa-boom')();
const joi = require('joi');
const validator = require('../validator');
const User = require('../../db/models/user');

const router = new Router();

router.post('/users', validator({
  body: {
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).max(200).required()
  }
}), async (ctx) => {

  let verifyEmail = await User.findOne(null, { 'email = ': ctx.request.fields.email });

  if (verifyEmail)
    boom.badRequest(ctx, `User with e-mail ${verifyEmail.email} already exists.`);

  let user = new User();

  user.name = ctx.request.fields.name,
  user.email = ctx.request.fields.email,
  user.password = ctx.request.fields.password;

  try {
    await user.save();
  } catch (err) {
    throw new Error();
  }

  ctx.body = "User created.";
});

module.exports = router;
