create database moviesapi;

use moviesapi;

SET sql_mode = '';

create table users(
  id bigint not null auto_increment primary key,
  email varchar(255) not null,
  password varchar(255) not null,
  unique key(email)
);

create table tokens(
  id bigint auto_increment primary key,
  user_id bigint not null,
  token varchar(255),
  constraint user_id_tokens_fk foreign key(user_id) references users(id) on delete cascade
);

create table movies(
  id bigint auto_increment primary key,
  title varchar(255) not null,
  director varchar(255) not null
);

create table rentals(
  id bigint auto_increment primary key,
  movie_id bigint not null,
  user_id bigint not null,
  date timestamp not null,
  active boolean default true,
  constraint user_id_rentals_fk foreign key(user_id) references users(id) on delete cascade,
  constraint movie_id_rentals_fk foreign key(movie_id) references movies(id) on delete cascade
);
