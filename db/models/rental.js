'use strict';

const Basic = require('./basic');

/**
 * Definição do model das locações
 */
class Rental extends Basic {

  constructor() {
    super();
  }

  static table() {
    return 'rentals';
  }

  get movieId() {
    return this.fields.movie_id;
  }

  set movieId(movieId) {
    this.fields.movie_id = movieId;
  }

  get userId() {
    return this.fields.user_id;
  }

  set userId(userId) {
    this.fields.user_id = userId;
  }

  get date() {
    let date = this.fields.date;
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }

  get objectDate() {
    return this.fields.date;
  }

  set date(date) {
    if (typeof date == "string")
      date = new Date(date);

    this.fields.date = date;
  }

  get active() {
    return this.fields.active;
  }

  set active(active) {
    this.fields.active = active;
  }
}

module.exports = Rental;
