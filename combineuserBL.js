const usersjsonDal = require('../DALs/usersjsonDal')
const permessionjsonDal = require('../DALs/permessionjsonDal')
const userBL = require('./userBL')

exports.usersFromJson = async () => {

  let usersFromJson = await usersjsonDal.getUsers()
    return usersFromJson.users
}

 

exports.usersFromPers = async () => {

    let usersFromPers = await permessionjsonDal.getUsers()
    // console.log('usersFromPers', usersFromPers)
    return usersFromPers.data
  }

exports.usersFromDb = async() => {
    let usersFromDb = await userBL.getAllUser()
   return usersFromDb.map((item)=>{
       return {
           id : item._id.toString(),
           userName : item.userName,
           password : item.password
        }
    })} 
    
        
    
        
  
exports.mergUserData = async () => {
    let usersFromJson = await  this.usersFromJson()
    let usersFromPers = await this.usersFromPers()
    let mergusers= usersFromJson.map(userJ => ({...userJ, ...usersFromPers.find(userP => userP._id === userJ._id)}) )
    console.log('mergusers', mergusers)
    return mergusers
} 


exports.removeDuplicate = (array) =>{
let uniq =  [...new Set(array)];
    return uniq
}

exports.mergUserData2 = async () => {
let usersfromdata = await this.mergUserData()
let userfromdb = await this.usersFromDb()
console.log('userfromdb',userfromdb) 
let mergusers2 = usersfromdata.map(userJ => ({...userJ, ...userfromdb.find(userD => (userD._id === userJ._id))}) )
return mergusers2
}

const checkIdexsintDb = async(id) => {
    let userfromdb = await this.usersFromDb()
    userfromdb.forEach((user) => {
        if(user.id == id){
            
            console.log('yes'+' ' +  id )
            return false
        }
        else{
            console.log('no'+' '+ id)
        }
    
    })
}




const uniteUsers = async () => {
 let mergUserData2 = await this.mergUserData2()
//  console.log('mergUserData2', mergUserData2)
 let userfromdb = await this.usersFromDb()
//  console.log('userfromdb',userfromdb)

 mergUserData2.push(...userfromdb)
 return mergUserData2
}


