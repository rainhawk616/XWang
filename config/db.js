'use strict';

const pg = require('pg');
const pgp = require('pg-promise')();

const config = {
  user: process.env.DATABASE_USER || 'postgres',
  database: process.env.DATABASE_DATABASE || 'jsonb_test',
  password: process.env.DATABASE_PASSWORD || 'rootroot',
  host: process.env.DATABASE_HOST || 'localhost',
  port: process.env.DATABASE_PORT || 5432,
  max: process.env.DATABASE_MAX || 10
};

const db = pgp(config);

module.exports = {db};