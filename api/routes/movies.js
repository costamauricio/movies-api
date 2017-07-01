'use-strict';

const Router = require('koa-router');

const router = new Router({
  prefix: '/movies'
});

router.get('/', async (ctx) => {
  console.log(ctx);
});

router.get('/:id', async (ctx) => {
  console.log(ctx);
});

router.get('/:id/rental', async (ctx) => {
  console.log(ctx);
});

router.get('/:id/return', async (ctx) => {
  console.log(ctx);
});

module.exports = router;
