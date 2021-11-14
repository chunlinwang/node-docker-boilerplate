# Chunlin's NodeJs docker boilerplate

## Initialize project

```shell
# initialize service
npx express-generator --no-view express
```

***

## Api service

**Libraries:**  
> express, axios, compression, cookie-parser, cors, dotenv, helmet, http-errors, morgan, winston

**Libraries dev:**  
> eslint, jest, nodemon, prettier, supertest, eslint-plugin-prettier

### Initialize jest et eslint

```shell
yarn run eslint --init 
yarn run jest --init
```

***

### Jest test config [filePath](jest.config.js)

For this boilerplate, the coverage of unit test is 100%

```javascript
    coverageThreshold: {
        global: {
            branches: 100,
            functions: 100,
            lines: 100,
            statements: 100,
        },
    },
```

### OpenApi (Swagger)

A route OpenApi has been exposed [http://127.0.0.1:8080/openapi.json](http://127.0.0.1:8080/openapi.json).
We can download this json and upload on [https://editor.swagger.io/](https://editor.swagger.io/) to have an apidoc.
We can also import this configuration file in postman.

***

## *How to run this project on local*

### Update CAT_API_KEY in .env.dist

*Notice: For the first time, We should wait for a little because of `yarn install`*

### How to run build this project on local

```shell
make build
```

### How to connect to docker container

```shell
# Connect to app container
make cli SERVICE=app  

# Connect to rabbitmq container
make cli SERVICE=rabbitmq  
```

***

### URL of micro service on local

#### > [endpoint of service is http://127.0.0.1:8080/](http://127.0.0.1:8080/)

***

### RabbitMq

In this boilerplate, I have added some examples for rabbitmq.

```shell
# To run example consumer
yarn consumer:example

```

***

### Git Hooks

I have added 2 hooks

- `yarn lint` in pre-commit hook
- `yarn test` in pre-push hook

If we want use husky git hooks, we should run `yarn husky install` on your machine.