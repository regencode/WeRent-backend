# WeRent backend - Team 2 (Hiu)

## Endpoints

Coming soon...

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
Docs: Coming soon...

## Contributing

To contribute please follow the [contributing guidelines](./CONTRIBUTING.md).

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

Ubah readme MDDDDDD

## Swagger Documentation

### 1. Install Dependencies
```bash
$ npm install --save @nestjs/swagger swagger-ui-express
```
### 2. Enable the CLI Plugin in nest-cli.json
```json
{
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "plugins": [
      {
        "name": "@nestjs/swagger",
        "options": {
          "classValidatorShim": false,
          "introspectComments": true,
          "skipAutoHttpCode": true
        }
      }
    ]
  }
}
```

### 3. Initialize Swagger in main.ts

```typescript
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Configure and initialize Swagger
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Title')
    .setDescription('API Description')
    .setVersion('1.0')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
```

### 4. Run the Application

```bash
npm run start:dev
```

### 5. Access the Swagger UI at http://localhost:3000/api