const axios = require('axios');


exports.GetAllMembers =  () =>
{
    return  axios.get("https://jsonplaceholder.typicode.com/users")
 
}




