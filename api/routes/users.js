'use-strict';

const Router = require('koa-router');
const User = require('../../db/models/user');

const router = new Router();

router.post('/users', async (ctx) => {

  let user = new User();

  user.email = ctx.request.fields.email,
  user.password = ctx.request.fields.password;

  await user.save();

  ctx.status = 200;
});

module.exports = router;
