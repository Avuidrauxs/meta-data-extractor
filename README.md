# Metadata Extractor
[![Coverage Status](https://coveralls.io/repos/github/Avuidrauxs/meta-data-extractor/badge.svg?branch=master)](https://coveralls.io/github/Avuidrauxs/meta-data-extractor?branch=master)

This is a project built to extract a Publisher titles from an RDF file


## How to Setup

### Create a database
- Create a database eg. `project_gutenberg`


### Configuration
- Inside `/src/config/config.js` , have these environment values set.
```
development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: mysql | postgres
  }
```
* OR

```
development: {
    use_env_variable: 'DATABASE_TEST_URL'
  }
```

### Run migrations
```
npx sequelize-cli db:migrate
```

### Reset Database
```
npm run reset:db
```


## Run Tests

```
npm run reset:db

npm test
```
