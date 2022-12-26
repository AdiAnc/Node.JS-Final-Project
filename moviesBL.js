const axios = require ('axios');
const jsonfile = require ('jsonfile')
const moviesDal = require('../DALs/moviesDal');
const flagsDal = require('../DALs/flagsjsonDal')
const { getAllUser } = require('./userBL');
const moviesSchema = require('../models/moviesModel');
const subscriptionsBL = require('../models/subscriptionsBL');
var ObjectId = require('mongoose').Types.ObjectId; 
// const GetFlag = async () => {
// let Flag = await flagDal.GetFlag()
// if ( Flag == not created)
// }

// This function is for intinal creation of movies in the DB

exports.GetAllMoviesFromAPI = async () => {
    let allmovies = await moviesDal.GetAllMovies()
        return allmovies.data.map((movie)=>{
            return{
                id : movie._id ,
                name: movie.name,
                genres: movie.genres,
                premiered : movie.premiered.split('').splice(0,4).join(''),
                image : movie.image.medium
            }}
        )}
            

  exports.storeMoviesFromApi = async () =>{
   let flags = await flagsDal.GetFlag()
     if (!flags.moviesUpdatedFromAPI){
    let  allmovies = await this.GetAllMoviesFromAPI();
    let resp = await moviesSchema.insertMany(allmovies)
    flags.moviesUpdatedFromAPI = true
   let status = await flagsDal.SetFlag(flags)
   }
   return moviesSchema.find({})
}


exports.addmovie = (movie) =>{
     return new Promise((resolve, reject) => {
        let movieDoc = moviesSchema({name: movie.name, genres :movie.genres , premiered : movie.premiered, image : movie.image  })
        movieDoc.save((err) =>{
            if(err) {
                reject(err)
            }
            else { resolve(movieDoc._id) }
            
        })
     }
     
     
     )

}
const getAllMoviesNotSubscribed = async function(memberId)
{
    let allMovies = await moviesSchema.find({});
    try{
        let moviesSubscribe = await subscriptionsBL.getSubscriptionByMemberId(memberId)
        console.log('hey')
        let moviesSubscribeIds = moviesSubscribe.movies.map((item) => {
            return item.movieId
        });
        console.log('moviesSubscribeIds',moviesSubscribeIds )
        console.log('all movies', allMovies)
        if(moviesSubscribeIds){
            let moviesNotWatched = allMovies.filter((n) => {
                !moviesSubscribeIds.includes(n._id.toString())
            }) 
              console.log('not watched', moviesNotWatched);
        }
   
            }catch{console.log("catch")}
    // let moviesNotWatched = console.log(A.filter(n => !B.includes(n)))

}

exports.getMovieById = function (movieid) 
{
    return new Promise ((resolve, reject)=>
    {
        moviesSchema.findById(movieid,function(err, data){
         if(err)
         {
            reject(err)
         }   
        else{
            resolve(data)
        }            
        })})}




exports.editMovie = function (movieid, obj) 
{
    return new Promise((resolve, reject) =>
    {
        moviesSchema.findByIdAndUpdate(movieid,obj, function (err)
        {
            if(err)
            {
                reject(err)
            }
            else{
                resolve('Updated!!')
            }
        })

    })
}
exports.getTitleByMovieId = async function(movieId)
    {
        let movieData = await moviesSchema.findById(movieId)
       
        return movieData.name
    }

   

    getAllMoviesNotSubscribed('62e7ec426595f4026deab3fc')
            