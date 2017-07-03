'use-strict';

const Router = require('koa-router');
const boom = require('koa-boom')();
const joi = require('joi');
const validator = require('../validator');
const auth = require('../auth');
const User = require('../../db/models/user');

const router = new Router();

/**
 * Rota de criação dos usuários
 */
router.post('/users', validator({
  body: {
    name: joi.string().required(),
    email: joi.string().required(),
    password: joi.string().min(6).max(200).required()
  }
}), async (ctx) => {

  /**
   * Verifica se o email já esta sendo usado
   */
  let verifyEmail = await User.findOne(null, { 'email = ': ctx.request.fields.email });

  if (verifyEmail)
    boom.badRequest(ctx, `User with e-mail ${verifyEmail.email} already exists.`);

  let user = new User();

  try {
    user.name = ctx.request.fields.name,
    user.email = ctx.request.fields.email,
    user.password = await auth.cryptPassword(ctx.request.fields.password);

    await user.save();
  } catch (err) {
    boom.badImplementation(ctx);
  }

  ctx.status = 204;
});

module.exports = router;
