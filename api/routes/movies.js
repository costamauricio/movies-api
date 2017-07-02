'use-strict';

const Router = require('koa-router');
const auth = require('../auth');

const router = new Router({
  prefix: '/movies'
});

router.use(auth.authorize());

router.get('/', async (ctx) => {
  ctx.status = 200;
});

router.get('/:id', async (ctx) => {
  ctx.status = 200;
});

router.get('/:id/rental', async (ctx) => {
  ctx.status = 200;
});

router.get('/:id/return', async (ctx) => {
  ctx.status = 200;
});

module.exports = router;
