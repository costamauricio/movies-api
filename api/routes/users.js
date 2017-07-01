'use-strict';

const Router = require('koa-router');

const router = new Router();

router.post('/users', async (ctx) => {
  console.log(ctx);
});

module.exports = router;
