create database moviesapi;

use moviesapi;

SET sql_mode = '';

create table users(
  id bigint not null auto_increment primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  unique key(email)
);

create table tokens(
  id bigint auto_increment primary key,
  user_id bigint not null,
  token varchar(255) not null,
  constraint user_id_tokens_fk foreign key(user_id) references users(id) on delete cascade
);

create table movies(
  id bigint auto_increment primary key,
  title varchar(255) not null,
  director varchar(255) not null,
  copies integer not null default 1
);

insert into movies(title, director, copies) values
  ('Star Wars Episode IV - A New Hope', 'George Lucas', 2),
  ('Star Wars Episode V - The Empire Strikes Back', 'Irvin Kershner', 1),
  ('Star Wars Episode VI - Return of the Jedi', 'Richard Marquand', 3),
  ('Star Wars Episode I - The Phantom Menace', 'George Lucas', 1),
  ('Star Wars Episode II - Attack of the Clones', 'George Lucas', 2),
  ('Star Wars Episode III - Revenge of the Sith', 'George Lucas', 1),
  ('Star Wars Episode VII - The Force Awakens', 'J. J. Abrams', 10),
  ('Rogue One: A Star Wars Story', 'Gareth Edwards', 5),
  ('Star Trek: The Motion Picture', 'Robert Wise', 1),
  ('Star Trek II: The Wrath of Khan', 'Nicholas Meyer', 1),
  ('Star Trek III: The Search for Spock', 'Leonard Nimoy', 1),
  ('Star Trek IV: The Voyage Home', 'Leonard Nimoy', 1),
  ('Star Trek V: The Final Frontier', 'William Shatner', 1),
  ('Star Trek VI: The Undiscovered Country', 'Nicholas Meyer', 1),
  ('Star Trek Generations', 'David Carson', 1),
  ('Star Trek: First Contact', 'Jonathan Frakes', 1),
  ('Star Trek: Insurrection', 'Jonathan Frakes', 1),
  ('Star Trek: Nemesis', 'Stuart Baird', 1);

create table rentals(
  id bigint auto_increment primary key,
  movie_id bigint not null,
  user_id bigint not null,
  date timestamp not null,
  active boolean default true,
  constraint user_id_rentals_fk foreign key(user_id) references users(id) on delete cascade,
  constraint movie_id_rentals_fk foreign key(movie_id) references movies(id) on delete cascade
);
