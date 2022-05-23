const { query } = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();
const { MONGO_URI, VIEWS_COL } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
    getDBConnection,
    sendResp
} = require("./utils");

const getAllViews = async(req, res) => {
    /*GET all views in the DB */
    const client = new MongoClient(MONGO_URI, options);
    try {
        const db = await getDBConnection(client);
        const opcodes = await db.collection(VIEWS_COL).find().toArray();
        const formattedOpcodes = opcodes.map(elt => {
            return {
                name: elt.name, 
                values:{
                    _id: elt._id, 
                    view: elt.view
                }
            }
        })
        sendResp(res, 200, formattedOpcodes);
    }

    catch(err) {
        console.log(err);
        sendResp(res, 500, {}, err);
    }

    finally{
        client.close();
    }
};

const createView = async(req, res) => {
    /*
      POST a message to create a new view
      req looks like
      {name, view}
     */
      const client = new MongoClient(MONGO_URI, options);
      try {
        const newView = {name: req.body.name, view: req.body.view};
        const db = await getDBConnection(client);
        const result = await db.collection(VIEWS_COL).insert(newView);
        sendResp(res, 200, result);
    }

    catch(err) {
        console.log(err);
        sendResp(res, 500, {}, err);
    }

    finally{
        client.close();
    }


};


const deleteView = async(req, res) => {
    /*
     DELETE a view from the DB
     req looks like
     {_id}
    */
     const client = new MongoClient(MONGO_URI, options);
     try {
        const toDelete = {_id: ObjectId(req.body._id)}
        const db = await getDBConnection(client);
        const deleted = await db.collection(VIEWS_COL).deleteOne(toDelete);
        sendResp(res, 200, deleted);
    }

    catch(err) {
        console.log(err);
        sendResp(res, 500, {}, err);
    }

    finally{
        client.close();
    } 
};

module.exports = {getAllViews, createView, deleteView};