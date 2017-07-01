'use-strict';

const Router = require('koa-router');

const router = new Router({
  prefix: '/auth'
});

router.post('/login', async (ctx) => {
  console.log(ctx);
});

router.get('/logout', async (ctx) => {
  console.log(ctx);
});

module.exports = router;
