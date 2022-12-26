const mongoose = require('mongoose');
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    family: 4,
    autoIndex: false, // Don't build indexesmaxPoolSize: 10, // Maintain up to 10 socket connectionsserverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 secondssocketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivityfamily: 4 // Use IPv4, skip trying IPv6
}


mongoose.connect('mongodb://localhost:27017', options).then(()=> {

console.log('just a test for mongoose sub2', mongoose.connection.readyState)

}).catch((err)=>console.log('failed', err));





