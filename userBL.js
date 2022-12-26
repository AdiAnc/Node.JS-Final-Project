const axios = require ('axios');

const usersSchema = require('./userModel');

const usersjsonDal = require('../DALs/usersjsonDal')



exports.login = (userName, password) => {

return new Promise((resolve, reject) => {

usersSchema.findOne({userName: userName}, (err, data) => {

if (err) {

reject("err with mongoose");

}

else if(!data) {

reject("user is not exists");



}

else if (data.password === password){


resolve( data);



}

else {




reject("password is not matched");

}

});

});

}



exports.createAccount = (userName, password) => {

    return new Promise((resolve, reject) => {
    
    usersSchema.findOne({userName: userName}, (err, data) => {
    
    if (err) {
    
    
    reject("err with mongoose");
    
    }
    
    else if(!data) {
    
    let userDoc = usersSchema({userName: userName, password: password})
    
    
    userDoc.save((err) => {
    
    if(err) {
    
    reject(err);
    
    } else {
    
    resolve(userDoc._id);
    
    }});
    
    }});
    
    });}


    exports.getAllUser= () => {

        return new Promise((resolve, reject) => {
        
        usersSchema.find({}, (err, data) => {
        
        if (err) {
        
        
        reject("err with mongoose");
        
        }
        
        else  {
        resolve((data));
        }});
        
        })}

        exports.getUserJasonById = async(_id) =>{

            let allusers = await usersjsonDal.getUsers()
            let currentUser = allusers.users.find((item)=>
            {
              return  item.id === _id 
            })

            if(!currentUser){
                return("no User by this id in json")
            } else {
                return(currentUser)
            }
        }
 