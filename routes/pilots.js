'use strict';

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const qg = require('../utils/queryGenerator');

/**
 * GET search page
 */
router.get('/search', function (req, res) {
  const types = [
    {table: 'upgrades', column: 'type'},
    {table: 'upgrades', column: 'restrictions'},
    {table: 'upgrades', column: 'wave'},
    {table: 'upgrades', column: 'deploy'},
  ];

  db.db.tx(t => {
    const queries = [];

    for (let i = 0; i < types.length; i++) {
      const typeQuery = qg.type(types[i]);
      queries.push(t.many(typeQuery.queryString, typeQuery.parameters));
    }

    return t.batch(queries);
  })
    .then(data => {
      let i = 0;
      res.render('upgrades/search', {
        types: data[i++],
        restrictions: data[i++],
        waves: data[i++],
        deploys: data[i],
      });
    })
    .catch(error => {
      console.log(error);
      throw error;
    });
});

router.get('/list', function (req, res) {
  let encodedQuery = req.query.query;
  let decodedQuery = decodeURI(encodedQuery);
  let queryObject = JSON.parse(decodedQuery);

  const query = qg.upgrade(queryObject);

  console.log(JSON.stringify(query, null, 2));

  db.db.manyOrNone(query.queryString, query.parameters)
    .then(function (upgrades) {
      console.log(upgrades);

      res.render('upgrades/list', {upgrades: upgrades, query: queryObject, queryString: query.queryString});
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
