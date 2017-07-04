'use strict';

const Basic = require('./basic');
const Rental = require('./rental');

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

  get copies() {
    return this.fields.copies;
  }

  set copies(copies) {
    this.fields.copies = copies;
  }

  /**
   * Retorna o número de cópias disponíveis para locação
   */
  getAvaiableCopies() {

    return new Promise((resolve, reject) => {
      
      Rental.find({'movie_id =': this.id, 'active =': true})
        .then((data) => {
          resolve(this.copies-data.length);
        })
        .catch(reject);
    });
  }
}

module.exports = Movie;
