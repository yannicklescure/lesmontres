"use strict";

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const getCompanies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const result = await db.collection("companies").find().toArray();
    result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error Getting Companies", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const getItems = async (req, res) => {
  console.log(req.query);

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const result = await db.collection("items").find().toArray();
    let data = result;

<<<<<<< HEAD
    if (req.query.categories) {
=======
    if (req.query.categories === "true") {
>>>>>>> f450a3dee0acfb6e465af10986fe051d54b543b7
      let categories = [];
      data.forEach((item) => {
        if (!categories.includes(item.category)) categories.push(item.category);
      });
      data = categories;
    }

    result
      ? res.status(200).json({ status: 200, data, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error Getting Items", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};
const getUsers = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const result = await db.collection("users").find().toArray();
    result
      ? res.status(200).json({ status: 200, data: result, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error Getting Companies", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

module.exports = {
  getItems,
  getCompanies,
  getUsers,
};
