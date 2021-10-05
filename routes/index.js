var express = require('express');
var router = express.Router();

/* GET home page. */
// keeping this for checking
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
