const membersBL = require('./membersBL')
const subscriptionsBL = require('./subscriptionsBL')
const moviesBL = require('./moviesBL')
const { GetAllSubscriptions } = require('./subscriptionsBL')



exports.getSubscriptionMoviesByMember = async(member) => {
    let movies =[];
    try {
        let dataFromSubscription = await subscriptionsBL.getSubscriptionByMemberId(member.id);
        if (dataFromSubscription && dataFromSubscription.movies) {
            for (let movie of dataFromSubscription.movies) {
                console.log('dataFromSubscription', dataFromSubscription)
                let currentMovie = {};
                currentMovie.date = movie.date;
                currentMovie.title = await moviesBL.getTitleByMovieId(movie.movieId)
                movies.push(currentMovie)
            }
            // console.log('movies', movies)
            return movies;
        }
    }
    catch {
        console.log("error getSubscriptionByMemberId");
    }
}

exports.getMemberfromDB = async()=>{
    let memberfromdb =await membersBL.storeMembersFromApi()
        return memberfromdb.map((member) => {
            return{
             id : member._id.toString(), 
             name : member.name,
             email :member.email,
             city: member.city  
            }
})}

  exports.combineMembersAndSubscriptions = async() => {
        // get dat from member collection
        let memberFinalData = [];
        const allmembers = await this.getMemberfromDB(); 
        for (let member of allmembers) {
            let combineUser ={};
            try {
                combineUser.name = member.name;
                combineUser.id = member.id;
                combineUser.email = member.email;
                combineUser.city = member.city;
                let subscriptionsMovies = await this.getSubscriptionMoviesByMember(member);
                if (subscriptionsMovies) { 
                    combineUser.movies = subscriptionsMovies 
                    memberFinalData.push(combineUser)
                 }
                 else {
                    memberFinalData.push(combineUser)
                 }
                } catch {
                   console.log('success!');
                } 

       }
        
            
       console.log("memberFinalData", memberFinalData)
       return (memberFinalData)
    }  

   
    const combineMembersAndSubscriptionsById = async(memberId) => {
       
       try{

        let member = await membersBL.getMemberById(memberId); 
        console.log('member', member)
        let combineUser ={};
        try {
                combineUser.name = member.name;
                combineUser.id = member.id;
                combineUser.email = member.email;
                combineUser.city = member.city;
                console.log('test')
                let subscriptionsMovies = await subscriptionsBL.getSubscriptionMoviesByMember(member)
                console.log('subscriptionsMovies', subscriptionsMovies)
                console.log('test1')

    }
    catch {
        console.log('success!');
     } 
        }catch {
            console.log('success!');
         } 
               
       }
        
            
       combineMembersAndSubscriptionsById('630c7b1280ad61861b205036') 

   






