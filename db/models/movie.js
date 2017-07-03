'use strict';

const Basic = require('./basic');

/**
 * Definição do model dos filmes
 */
class Movie extends Basic {

  constructor() {
    super();
  }

  static table() {
    return 'movies';
  }

  get title() {
    return this.fields.title;
  }

  set title(title) {
    this.fields.title = title;
  }

  get director() {
    return this.fields.director;
  }

  set director(director) {
    this.fields.director = director;
  }
}

module.exports = Movie;
