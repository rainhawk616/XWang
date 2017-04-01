'use strict';

const express = require('express');
const router = express.Router();
const db = require('../config/db');
const qg = require('../middleware/queryGenerator');

/**
 * GET search page
 */
router.get('/search', function(req, res, next) {
  db.db.tx(t => {
    const types = t.many('select description from borders order by description asc;');
    const restrictions = t.many('select description from colorIdentities order by description asc;');
    const waves = t.many('select description from colors order by description asc;');
    const deploys = t.many('select description from formats order by description asc;');

    return t.batch([types, restrictions, waves, deploys]);
  })
    .then(data => {
      let i = 0;
      res.render('upgrades/search', {
        types: data[i++],
        restrictions: data[i++],
        waves: data[i++],
        deploys: data[i++],
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

  console.log(JSON.stringify(query,null,2));

  db.db.manyOrNone(query.querystring , query.parameters)
    .then(function (upgrades) {
      console.log(upgrades);

      res.render('upgrades/list', {upgrades: upgrades, query:queryObject});
    })
    .catch(function (error) {
      console.log(error);
    });
});

// router.get('/', function(req, res, next) {
//   db.db.manyOrNone("select data from upgrades;")
//     .then(function (upgrades) {
//       res.render('upgrades', {upgrades: upgrades});
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });

module.exports = router;
