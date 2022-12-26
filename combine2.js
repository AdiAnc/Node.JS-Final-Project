const membersBL = require('./membersBL')
const subscriptionsBL = require('./subscriptionsBL')
const moviesBL = require('./moviesBL')
const { GetAllSubscriptions } = require('./subscriptionsBL')
const membersSchema = require('./membersModel')

const getMemberData =  () =>
{
    return new Promise(async (resolve,reject) =>
    {
        let MembersFinalData = [];

        //Get data from subscreptions
        let dataFromSubscreptions = await subscriptionsBL.GetAllSubscriptions()
        //Get data from movies

        let dataFromMovies = await moviesBL.storeMoviesFromApi()
         membersSchema.find({}, function(err,dataFromMembers)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                dataFromMembers.forEach(member =>
                    {
                        let obj = {};
                        obj.id = member._id;
                        obj.name = member.name;
                        obj.email = member.email;
                        obj.city = member.city;

                        let subOfMember = dataFromSubscreptions.find(x => x.memberId ==  obj.id);
                        subOfMember.movies.forEach(async(item) =>{
                            let currentMovie = {};
                            currentMovie.date = item.date;
                            currentMovie.title = await moviesBL.getTitleByMovieId(item.movieId)
                            movies.push(currentMovie)
                            obj.movies = movies
                        })
                        MembersFinalData.push(obj);

                    })
                
                resolve(MembersFinalData)
            }
        })
    })
}

module.exports = {getMemberData}

getMemberData()



