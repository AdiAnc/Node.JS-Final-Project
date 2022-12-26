const mongoose = require('mongoose');

const db = require('../config/database');



let moviesSchema = new mongoose.Schema({
    
    name: String,
    genres: [String],
    premiered : String ,
    image : String
})

const subscriptions = mongoose.connection.useDb('subscriptions');

module.exports = subscriptions.model('movies', moviesSchema);







