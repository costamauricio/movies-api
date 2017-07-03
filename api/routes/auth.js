'use-strict';

const Router = require('koa-router');
const boom = require('koa-boom')();
const joi = require('joi');
const validator = require('../validator');
const auth = require('../auth');
const User = require('../../db/models/user');
const Token = require('../../db/models/token');

const router = new Router({
  prefix: '/auth'
});

/**
 * Rota do login
 */
router.post('/login', validator({
  body: {
    email: joi.string().required(),
    password: joi.string().required()
  }
}), async (ctx) => {

  /**
   * Verifica se o usuário existe
   */
  let user = await User.findOne(null, {'email = ': ctx.request.fields.email});

  if (!user)
    boom.unauthorized(ctx, 'Invalid user.');

  if (!await auth.comparePassword(ctx.request.fields.password, user.password))
    boom.unauthorized(ctx, 'Invalid password.');

  try {

    var generatedToken = auth.generateToken(user),
        token = await Token.findOne(null, {'user_id =': user.id});

    /**
     * Verifica se já existe um token de acesso gerado para o usuário
     */
    if (token)
      await token.remove();
    else
      token = new Token();

    token.userId = user.id;
    token.token = generatedToken;

    await token.save();
  } catch(err) {
    boom.badImplementation(ctx);
  }

  ctx.body = {
    token: generatedToken
  };

});

/**
 * Rota do logout
 */
router.get('/logout', auth.authorize(), async (ctx) => {

  try {

    let token = await Token.findOne(null, {'user_id = ': ctx.req.user.id});
    await token.remove();

  } catch (e) {
    boom.badImplementation(ctx);
  }

  ctx.status = 204;
});

module.exports = router;
