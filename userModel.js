const mongoose = require('mongoose');

const db = require('../config/database');



let usersSchema = new mongoose.Schema({

    id: String,
    userName: String,
    password: String

})

const final = mongoose.connection.useDb('final');

module.exports = final.model('users', usersSchema);
