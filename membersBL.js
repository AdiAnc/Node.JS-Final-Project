const axios = require ('axios');
const flagsDal = require('../DALs/flagsjsonDal')
const membersSchema = require('./membersModel')
const membersDal= require('../DALs/membersDal') 


exports.GetAllMemberFromApi = async () => {
    let allmemebers = await membersDal.GetAllMembers();
    return allmemebers.data.map((member)=> {
       return{
            name : member.name,
            city : member.address.city,
            email : member.email

        }} );
    }
    


 exports.storeMembersFromApi = async () =>{
    let flags = await flagsDal.GetFlag()
     if(!flags.membersUpdatedFromAPI){
     let allmembers = await  this.GetAllMemberFromApi()
     let resp = await membersSchema.insertMany(allmembers)
     flags.membersUpdatedFromAPI = true
     let status = await flagsDal.SetFlag(flags)    
    }
    let members = await membersSchema.find({})
    return members;
 }       


 exports.getMemberById = function(memberId) 
{
    return new Promise ((resolve, reject)=>
    {
        console.log("member id" ,memberId )
        membersSchema.findById(memberId,function(err, data){
         if(err)
         {
            reject(err)
         }   
        else{
            resolve(data)
        }            
        })})}
        
        
        exports.editMember = function (memberID, obj) 
{
    return new Promise((resolve, reject) =>
    {
        membersSchema.findByIdAndUpdate(memberID,obj, function (err)
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


exports.addmemeber = (member) =>{
    return new Promise((resolve, reject) => {
       let memberDoc = membersSchema({name: member.name, email :member.email , city : member.city })
       memberDoc.save((err) =>{
           if(err) {
               reject(err)
           }
           else { resolve(memberDoc._id) }
           
       })
    })}

    exports.deleteMember = function(id)
{
    return new Promise((resolve, reject) =>
    {

        membersSchema.findByIdAndDelete(id,function(err)
            {
                if(err)
                {
                    reject(err);
                }
                else
                {
                    resolve('Deleted !!')
                }
            })

            console.log('the member delted')

    })
}