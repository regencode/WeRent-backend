# WeRent backend - Team 2 (Hiu)

## Endpoints

Coming soon...

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

1. Clone project and install npm dependencies

```bash
$ git clone https://github.com/regencode/WeRent-backend.git 
$ cd WeRent-backend
$ npm install
```

2. Set DATABASE_URL env variable in .env:
```
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```
Replace the placeholders with your actual database credentials:

- username: Your PostgreSQL username
- password: Your PostgreSQL password
- localhost:5432: Your PostgreSQL host and port
- mydb: Your database name

3. Generate prisma client library

```bash
$ npx prisma generate
```

4. Run in watch mode

```bash
$ npm run start:dev
```


## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
