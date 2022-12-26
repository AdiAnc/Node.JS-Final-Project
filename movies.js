var express = require('express');
var router = express.Router();
const moviesBL = require('../models/moviesBL')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('movies');
});


router.get('/all', async function(req, res, next) {
  console.log('req test', req) 
  let allmovies = await moviesBL.storeMoviesFromApi()
 res.render('allmovies', {allmovies: allmovies} )
  });



  router.get('/add', function(req, res, next) {
    res.render('addmember');
  });


  router.post('/add', async function(req, res, next) {
    let movie = req.body
    let resp = await moviesBL.addmovie(movie)
      res.render('movies')
    
})


// router.get('/edit', function(req, res, next) {
//   console.log("req",req.body)
//   res.render('editmovie', );
// });
  

router.get('/edit/:_id', async function(req, res, next) {
let movieid= req.params._id
let moviedata= await moviesBL.getMovieById(movieid)
res.render('editmovie',{moviedata : moviedata})
})

router.post('/edit/:_id', async function(req, res, next){
  let movieId = req.params._id
  let obj = req.body
  try {
    let movieUpdateStatus = await moviesBL.editMovie(movieId, obj)
    res.render('main');
  } 

catch{
  res.render('error', {error:error})
  }
  
})


module.exports = router;
