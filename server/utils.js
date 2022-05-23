// utility functions for service calls

const { MongoClient, MongoErrorLabel } = require("mongodb");
require("dotenv").config();
const { MONGO_URI, DATABASE } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getDBConnection = async (client) => {
    // Gets a DB client and connection to specfic DB
    try{
    
        await client.connect();
        const db = client.db(DATABASE);
        return db;
    }

    catch(err){
        throw err;
    }
    

}

const sendResp = (res, status, data, message) => {
    // formats a response to send
    res.status(status).json({status, data, message});
}

module.exports = {getDBConnection, sendResp};