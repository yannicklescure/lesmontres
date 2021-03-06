// const res = require("express/lib/response");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

require("dotenv").config();
const { MONGO_URI, DB_NAME } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const companies = require("./data/companies.json");
const items = require("./data/items.json");

const users = [
  {
    _id: uuidv4(),
    userName: 'John', 
    email: 'Doe', 
    password: 'qwerty', 
    cartArray: []
  },
  {
    _id: uuidv4(),
    userName: 'John', 
    email: 'Rambo', 
    password: 'qwerty', 
    cartArray: []
  },
  {
    _id: uuidv4(),
    userName: 'Marty', 
    email: 'McFly', 
    password: 'qwerty', 
    cartArray: []
  }
]

const batchImport = async () => {
  // creates a new client
  const client = new MongoClient(MONGO_URI, options);

  try {
    // connect to the client
    await client.connect();

    // connect to the database (db name is provided as an argument to the function)
    const db = client.db(DB_NAME);
    console.log("connected!");

    // const result1 = await db.collection("companies").insertMany(companies);
    // console.log(result1);
    // const result2 = await db.collection("items").insertMany(items);
    // console.log(result2);

    const usersArray = await db.collection("users").insertMany(users);
    console.log(usersArray);

    // close the connection to the database server
    client.close();
    console.log("disconnected!");
  } catch (err) {
    console.log(err);
  }
};

batchImport();
