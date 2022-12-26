var express = require('express');
var router = express.Router();
const membersBL = require('../models/membersBL')
const moviesBL = require('../models/moviesBL')
const combineBL = require('../models/combine')
const membersModel = require('../models/membersModel')
const subscriptionsdateBL = require('../models/subscriptionsBL')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('subscriptions');
});

router.get('/all', async function(req, res, next) {
  let allmembers = await combineBL.combineMembersAndSubscriptions();
  console.log('allmembers',allmembers[0].movies)
//  let allsubscriptiondate = await subscriptionsdateBL.GetAllSubscriptions()
//  let allmembers = await membersBL.GetAllMemberFromApi()
  res.render('allmembers', {allmembers : allmembers}
  );
});


router.get('/edit/:id', async function(req, res, next) {
  let memberId= req.params.id
  console.log('memberId', memberId)
  let memberData= await membersBL.getMemberById(memberId)
  res.render('editmember',{memberData : memberData})
  })

  router.get('/delete/:id', async function(req, res, next){
    let memberId = req.params.id
    console.log('delete route')
    try {
      let status = await membersBL.deleteMember(memberId)
      console.log("status:" , status)
      res.render('memberdelete', {message : " the member deleted "} );
    } 
  
  catch{
    console.log('failed')
    }
    
  })

  router.get('/add', function(req, res, next) {
    res.render('addmember');
  });


  router.post('/add', async function(req, res, next) {
    let member = req.body
    let resp = await membersBL.addmemeber(member)
      res.render('subscriptions')
    
})
  
router.get('/addsubscreption',async function(req, res, next) {
  let allmovies = await moviesBL.storeMoviesFromApi()
 
  console.log('allmoviesSub',allmovies)
  res.render('addsubscreption');
});


router.post('/addsubscreption', async function(req, res, next) {
  let member = req.body
  let resp = await membersBL.addmemeber(member)
    res.render('subscriptions')
  
})

module.exports = router;
