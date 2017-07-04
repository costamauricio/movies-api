'use-strict';

const Router = require('koa-router');
const boom = require('koa-boom')();
const joi = require('joi');
const validator = require('../validator');
const auth = require('../auth');
const Movie = require('../../db/models/movie');
const Rental = require('../../db/models/rental');

const router = new Router({
  prefix: '/movies'
});

router.use(auth.authorize());

/**
 * Rota dos filmes
 */
router.get('/', validator({
  query: {
    filter: {
      title: joi.string()
    }
  }
}), async (ctx) => {

  let conditions = null,
      params = ctx.request.query;

  /**
   * Filtra os filmes pelo título passado
   */
  if (params.filter && params.filter.title)
    conditions = {'title like': `%${ctx.request.query.filter.title}%`}

  let movies = await Movie.find(conditions);

  ctx.body = movies.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      director: movie.director
    };
  });
});

/**
 * Define os middlewares para as próximas rotas
 */
router.use('/:id',
  /**
   * Seta o middleware para validação do parametro da rota
   */
  validator({
    params: {
      id: joi.number().integer().required()
    }
  }),
  /**
   * seta o middleware para carregamento do filme passado
   */
  async function(ctx, next) {

    try {
      var movie = await Movie.findOne(ctx.params.id);
    } catch (e) {
      boom.badImplementation(ctx);
    }

    if (!movie)
      boom.notFound(ctx);

    ctx.movie = movie;

    await next();
  }
);

/**
 * Rota de consulta do filme
 */
router.get('/:id', async (ctx) => {

  ctx.body = {
    id: ctx.movie.id,
    title: ctx.movie.title,
    director: ctx.movie.director,
    copies: ctx.movie.copies,
    avaiable_copies: await ctx.movie.getAvaiableCopies()
  };
});


/**
 * Rota para locação do filme
 */
router.get('/:id/rental', async (ctx) => {

  try {
    var rental = await Rental.findOne(null, {'movie_id =': ctx.movie.id, 'user_id =': ctx.req.user.id, 'active =': true});
  } catch (e) {
    boom.badImplementation(ctx);
  }

  if (rental)
    boom.badRequest(ctx, 'Movie already rented by the user');

  if (await ctx.movie.getAvaiableCopies() == 0)
    boom.badRequest(ctx, 'There are no avaiable copies to rent');

  try {

    rental = new Rental();

    rental.movieId = ctx.movie.id;
    rental.userId = ctx.req.user.id;
    rental.date = new Date();
    rental.active = true;

    await rental.save();
  } catch (e) {
    boom.badImplementation(ctx);
  }

  ctx.status = 204;
});


/**
 * Rota para devolução do filme
 */
router.get('/:id/return', async (ctx) => {

  try {
    var rental = await Rental.findOne(null, {'movie_id =': ctx.movie.id, 'user_id =': ctx.req.user.id, 'active =': true});
  } catch (e) {
    boom.badImplementation(ctx);
  }

  if (!rental)
    boom.badRequest(ctx, 'Movie already returned.');

  try {
    rental.active = false;

    await rental.save();
  } catch(e) {
    boom.badImplementation(ctx, e);
  }

  ctx.status = 204;
});

module.exports = router;
