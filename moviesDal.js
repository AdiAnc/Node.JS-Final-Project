const axios = require('axios');


exports.GetAllMovies =  () =>
{
    return  axios.get("https://api.tvmaze.com/shows")
 
}




