var express = require('express');
var router = express.Router();

/* GET main */
router.get('/', function(req, res, next) {
  
  res.render('main');
});

module.exports = router;
