const mongoose = require('mongoose');

const db = require('../config/database');

let membersSchema = new mongoose.Schema({

    name : String,
    email :  String,
    city :  String,
   
})


const subscriptions = mongoose.connection.useDb('subscriptions');

module.exports = subscriptions.model('members', membersSchema);



