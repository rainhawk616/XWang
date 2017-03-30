const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  db.db.manyOrNone("select data from upgrades;")
    .then(function (upgrades) {
      res.render('upgrades', {upgrades: upgrades});
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
