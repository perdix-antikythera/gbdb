// Script for populating the opcodes section of the DB.
const request = require('request-promise');
const { MongoClient } = require("mongodb");
require("dotenv").config();
const {MONGO_URI} = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

const fetchOpcodeData = async() => {
    // Get the opcode data from online source
    try{
      const data = await request('https://gbdev.io/gb-opcodes/Opcodes.json');
      const opcodes = await JSON.parse(data);
      return opcodes;
    }
    
    catch(err){
      console.log(error);
    }
    
}

const flatten = (key, opcode, cbPrefixed=false) => {
  // Format the data. cbPrefixed specifies if we should assume the hex value passed
  // to be prefixed with 0xCB
  let hexCode = key;
  if(cbPrefixed) {
    hexCode = hexCode.slice(0, 2) + "CB" + hexCode.slice(2);
  }
  return {...opcode, hexCode}
}


const populateDB = async () => {
  const client = new MongoClient(MONGO_URI, options)

  try {
    const opcodes = await fetchOpcodeData();
    await client.connect();
    console.log('connected!');
    const db = client.db('GBDB');
    // map the unprefixed codes to a flattened array
    let unprefixedCodes = Object.keys(opcodes.unprefixed).map(
      elt => flatten(elt, opcodes.unprefixed[elt])
    );
    // map the cb prefixed codes to a flattend array
    let prefixedCodes = Object.keys(opcodes.cbprefixed).map(
      elt => flatten(elt, opcodes.cbprefixed[elt], true)
    );

    const allCodes = [...unprefixedCodes, ...prefixedCodes];
    const result = await db.collection('opcodes').insertMany(allCodes);
    console.log(result);

  }

  catch(err){
    console.log(err);
  }

  finally{
    client.close();
    console.log('success!')
  }
}

populateDB();


