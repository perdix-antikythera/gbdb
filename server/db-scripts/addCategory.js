// Script for adding a new category field to the database
const request = require('request-promise');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;
const {getCategory} = require('./getCategory.js');
const { get } = require('request-promise');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const addCategories = async () => {

    const client = new MongoClient(MONGO_URI, options)

    try {
        await client.connect();
        console.log('connected!');
        const db = client.db('GBDB');
        const allOpcodes = await db.collection('opcodes').find().toArray();
        
        for(let i=0; i< allOpcodes.length; i++){
            const code = allOpcodes[i];
            const category = getCategory(code.mnemonic, code.operands);
            console.log(category);
            const result = await db.collection('opcodes').findOneAndUpdate({'hexCode': code.hexCode}, {$set:{'category': category}});
            console.log(result);
        }
    }

    catch(err){
        console.log(err);
    }

    finally{
        client.close();
        console.log('success!')
    }
}

addCategories();