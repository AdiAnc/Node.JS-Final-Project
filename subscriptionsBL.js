const axios = require ('axios');
const flagsDal = require('../DALs/flagsjsonDal')
const subscriptionsSchema = require('./subscriptionsModel')
const membersSchema = require('./membersModel')
const membersBL= require('./membersBL')
const moviesBL= require('./moviesBL')




exports.GetAllSubscriptions = () => {
    // let allSubscriptions = await subscriptionsSchema.find({});
    // return allSubscriptions.map(async(sub)=> {
    //    let member = await membersBL.getMemberById(sub.memberId)
    //    console.log("member", member) 
    //    let movies = sub.movies.map(async(movie)=>{
    //     console.log("movie", movie)
    //     let newmovie = await moviesBL.getMovieById(movie.movieId)
        
    //     console.log("newmovie", newmovie)
    //     let title = newmovie.title
    //     return{ "title": title , "date": movies.date , }})
    // } );
 return subscriptionsSchema.find({});
}

// GetAllSubscriptions().then((data)=>console.log(data))
    
exports.getSubscriptionByMemberId = async (memberId)=>{
   let resp = await subscriptionsSchema.findOne({memberId: memberId});
if (resp) {
    return resp;

}
}
