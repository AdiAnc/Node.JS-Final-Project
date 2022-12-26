var express = require('express');
const userModel = require('../models/userModel');
const userBL = require('../models/userBL');
const combineuserBL = require('../models/combineuserBL');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users');
});

router.get('/all', async function(req, res, next) {
  let alluser = await combineuserBL.mergUserData2()
  console.log('alluser', alluser)
    res.render('allusers', {allUsers: alluser} );
  });





  router.get('/all', async function(req, res, next) {
    let allmovies = await moviesBL.GetAllMovies()
      res.render('allmovies', {allMovies: allmovies} );
    });

module.exports = router;
