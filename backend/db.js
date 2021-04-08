require('dotenv').config();
var mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(mongoURI, 
        {
            useNewUrlParser: true,  
            useUnifiedTopology: true
        });        
        console.log("connected to DB !!")
    } catch(e) {
        console.log("Error connecting to database: ", e);
        throw e;
    }
}

module.exports = InitiateMongoServer;


