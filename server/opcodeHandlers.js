const { query } = require('express');
const { MongoClient } = require('mongodb');
require("dotenv").config();
const { MONGO_URI, OPCODES_COL } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const {
    getDBConnection,
    sendResp
} = require("./utils");

// GET all opcodes from the database

const getAllOpcodes = async(req, res) => {
    const client = new MongoClient(MONGO_URI, options);
    try {
        const db = await getDBConnection(client);
        const opcodes = await db.collection(OPCODES_COL).find().toArray();
        sendResp(res, 200, opcodes);
    }

    catch(err) {
        console.log(err);
        sendResp(res, 500, {}, err);
    }

    finally{
        client.close();
    }
};

const expandArrayDisjunction = (key, paramVal) => {
    // given a key an an array of possible values, return an object representing the
    // query string

    // sample query
    // db.inventory.find( { $and: [ { quantity: { $lt: 20 } }, { price: 10 } ] } )

    let query = []
    if(Array.isArray(paramVal) && paramVal.length > 1){
        const disjunct = paramVal.map(elt => {
            const queryPart = {};
            queryPart[key] = elt;
            return queryPart;
        });
        query = disjunct;
    }
    
    // No need to add the or clause if we have a singleton array
    else if(Array.isArray(paramVal) && paramVal.length === 1){
        let queryPart = {};
        queryPart[key] = paramVal[0];
        query.push(queryPart);
    }

    else {
        let queryPart = {};
        queryPart[key] = paramVal;
        query.push(queryPart);
    }

    return query;
}

const makeCycleQuery = (operation, val) => {
    // Make the query string for querying operation cycles
    if(typeof val !== 'number'){
        throw new Error('Value passed for cycle must be a number!');
    }
    else {
        let query = [];

        switch(operation){
            case 'gt': {
                const queryPart = {cycles : {$gt: val}};
                query.push(queryPart);
                break;
            }

            case 'lt': {
                const queryPart = {cycles: {$lt: val}};
                query.push(queryPart);
                break;
            }

            case 'eq': {
                const queryPart = {cycles: val};
                query.push(queryPart);
                break;
            }

            default: {
                throw new Error(`Operation ${op} not recognized!`)
            }
        }

        return query;
    }
    
};

const makeFlagQuery = (flags) => {

    const query = {};
    Object.keys(flags).forEach(key => {
        query[`flags.${key}`] = flags[key];
    });

    return query
}

const makeOperandQuery = (operandQueryString) => {
    // Make the query string to look for the specified operand signature
    /*
    operandQueryString has the following shape
    [
        {
            name: optional. Name of the operand
            bytes: optional. Number of bytes taken up by the operand. Important when CPU reads data
            immediate: optional. Specifies if operand is read from memory pointed to by PC
            index: optional. Specifies the index of the operand. Assumed to be 0 indexed
        },
        {
            ...
        },...
    ]

    */

    if( Array.isArray(operandQueryString) && operandQueryString.length > 0 ){
        let query = [];
        // search through each operand passed
        for(let i = 0; i < operandQueryString.length; i++){
            let operand = operandQueryString[i];
            let searchKeys = Object.keys(operand);
            // We want to make sure the user actually passes something to search off of
            if(searchKeys.length > 0){
                
                // If the user specifies an index, we need to add it as a suffix to all keys to search through
                let indexSuffix = '';
                if(operand.hasOwnProperty('index')){
                    indexSuffix = `.${operand.index}`;
                }
                
                searchKeys.forEach(searchKey => {
                    if(searchKey !== 'index'){
                        // Get the value, and construct the subquery object and add it to the query
                        const searchValue = operand[searchKey];
                        let queryPart = {};
                        queryPart[`operands${indexSuffix}.${searchKey}`] = searchValue;
                        query.push(queryPart);
                    }
                })


            }

            else{
                throw new Error('Empty operand passed!')
            }

            return query;
        }
    }

    else if(!Array.isArray(operandQueryString)){
        throw new Error('Need an array of operands to search!');
    }

    // IE the array has length 0
    else {
        throw new Error('Array of operands is empty!');
    }
}

const getOpcodesByParams = async(req, res) => {
    // get all opcodes from the database that match a specific conjunction of parameters
    const client = new MongoClient(MONGO_URI, options);
    try{
        // simple parmeters in our DB consist of a literal value. These are
        // mnemonic, bytes, immediate, hexCode

        // complex parameters in our DB consist of some kind of data structure. these are
        // cycles, operands, flags

        if(Object.keys(req.body).length === 0){
            getAllOpcodes(req, res); 
        }
        else {
            let queryString = {$and: []};
            Object.keys(req.body).forEach(key => {
            // for simple parameters, we just look to see if we are passing multiple values to search for, and
            // provide the correct query object

            if(['mnemonic', 'bytes', 'immediate', 'hexCode', 'category'].includes(key)){
                // queryString = {...queryString, $and: expandArrayDisjunction(key, req.body[key])};
                queryString.$and.push(...expandArrayDisjunction(key, req.body[key]));

            }

            else if(key === 'cycles'){
                // cycles : {
                // op : 'gt' | 'lt' | 'eq'
                // val: number
                // }
                
                //queryString = {...queryString, $and: makeCycleQuery(req.body.cycles.op, req.body.cycles.val)};
                queryString.$and.push(...makeCycleQuery(req.body.cycles.op, req.body.cycles.val));
            }

            else if(key === 'flags'){
                /*
                    flags : {
                        Z: ...
                        N: ...
                        H: ...
                        C: ...
                    }
                */
                //queryString = {...queryString, $and: [makeFlagQuery(req.body.flags)]}
                // TODO: Check this for multiple flag values
                queryString.$and.push(makeFlagQuery(req.body.flags));
            }

            else if(key === 'operand'){

                queryString.$and.push(...makeOperandQuery(req.body.operand));
            }

        })
   
        const db = await getDBConnection(client);
        const opcodes = await db.collection(OPCODES_COL).find(queryString).toArray();
        sendResp(res, 200, opcodes);
        }
        
    }

    catch(err){
        console.log(err);
        sendResp(res, 500, {}, err);
    }

    finally{
        client.close();
    }
}

module.exports = {getAllOpcodes, getOpcodesByParams};