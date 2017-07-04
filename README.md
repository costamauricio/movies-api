# Movies-API

## Pré Requisitos

* NodeJS >= 7.6
* Mysql

## Instalação

* git clone https://github.com/costamauricio/movies-api.git
* cd movies-api && npm install

## Executando via Docker

* docker-compose up -d mysql
* docker-compose exec mysql /bin/sh -c 'mysql -u root -proot < /dump/init.sql'
* docker-compose up -d api
* Api disponível em http://localhost:8081

## Executando Local

* Configurar os dados de conexão com o banco no arquivo .env
* Rodar o arquivo da estrutura dump/init.sql
* npm start
* Api disponível em http://localhost:8081

## Rotas

### Rotas abertas

#### [post] /api/users
  * Criação de novos usuários
  * Body parameters:
    - name (string)
    - email (string)
    - password (string)
  * Return:
    - SatatusCode: 204

#### [post] /api/auth/login
  * Gera um token de acesso para um usuário
  * Body Parameters:
    - email (string)
    - password (string)
  * Return:
    - StatusCode: 200
    - Body:
      ```
        {
          data: {
            token: "..."
          }
        }
      ```

### Rotas protegidas

  * Header:
    - Authorization: JWT "token"

#### [get] /api/auth/logout
  * Destrói o token de acesso existente
  * Return:
    - StatusCode: 204

#### [get] /api/movies
  * Lista os filmes cadastrados
  * Query Parameters:
    - filter[title]=Some Movie (optional)
  * Return:
    - StatusCode: 200
    - Body:
      ```
        {
          data: [{
            id: 15,
            title: "some title",
            director: "some director"
          }]
        }
      ```

#### [get] /api/movies/:id
  * Exibe detalhes de um filme específico
  * Return:
    - StatusCode: 200
    - Body:
      ```
        {
          data: {
            id: 15,
            title: "some title",
            director: "some director",
            copies: 2
            avaiable_copies: 1
          }
        }
      ```

#### [get] /api/movies/:id/rental
  * Aluga um filme
  * Return:
    - StatusCode: 204

#### [get] /api/movies/:id/return
  * Devolve um filme alugado
  * Return:
    - StatusCode: 204
