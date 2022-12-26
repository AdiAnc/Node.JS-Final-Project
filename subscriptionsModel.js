const mongoose = require('mongoose');

const db = require('../config/database');



let subscriptionsSchema = new mongoose.Schema({

    memberId : String,
    movies :  [{movieId: String, date: String}]   
})


const subscriptions = mongoose.connection.useDb('subscriptions');

module.exports = subscriptions.model('subscriptions', subscriptionsSchema);








