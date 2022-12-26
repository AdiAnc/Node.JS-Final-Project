var express = require('express');
const { render } = require('../app');
var router = express.Router();
const userBL = require('../models/userBL')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('login')
});


router.post('/', async function(req, res, next) {

  let userName = req.body.userName;
  let password = req.body.password;
  
  try {
  
  let dataLogin = await userBL.login(userName, password);
  let currectUser = await userBL.getUserJasonById(dataLogin._id)
  if(!req.session.login)
  {
    req.session.login = userName;
  }
  else
  {
    {
      req.session.login = userName;
    }
  }
  req.session.userName = userName
  console.log('req session',req.session) 
  res.render('main',{login:req.session.userName });
  
  }
  
  catch(error) {
  
  res.render('error', {error:error})
  
  }
  

  });

  
router.get('/create', async function(req, res, next) {

  res.render('createAccount');
  
  
  
  });
  
  
  
  
  router.post('/create', async function(req, res, next) {
  
  let userName = req.body.userName;
  
  let password = req.body.password;
  
  try {
  
  let dataCreate = await userBL.createAccount(userName, password);
  
  res.redirect('/login');
  
  
  
  }
  
  catch {
  
  res.render('error', {error:error})
  
  }
  
  });

  module.exports = router;


  