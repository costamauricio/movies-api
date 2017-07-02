'use-strict';

const Router = require('koa-router');
const User = require('../../db/models/user');
const auth = require('../auth');

const router = new Router({
  prefix: '/auth'
});

/**
 * @param email
 * @param password
 */
router.post('/login', async (ctx) => {

  let user = await User.findOne(null, {'email = ': ctx.request.fields.email});

  ctx.body = auth.generateToken(user);
  ctx.status = 200;
});

router.get('/logout', auth.authorize(), async (ctx) => {
  ctx.body = ctx;
  ctx.status = 200;
});

module.exports = router;
