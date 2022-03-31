"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
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

    if (req.query.categories) {
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

const logInUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { email, password } = req.body;

  try {
    await client.connect();
    const db = client.db("LesMontres");
    if (!email || !password) {
      return res
        .status(400)
        .json({ status: 400, message: "Add Your Email and Password" });
    }
    const loginAuth = await db.collection("users").findOne({ email: email });
    if (loginAuth) {
      const loginPassword = await bcrypt.compare(password, loginAuth.password);
      if (loginPassword) {
        return res.status(200).json({
          status: 200,
          message: "User Logged In",
          data: loginAuth.cartArray,
        });
      } else
        return res
          .status(400)
          .json({ status: 400, message: "Password Don't Match " });
    } else
      return res.status(400).json({ status: 400, message: "E-mail Not Found" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

const createUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { firstName, lastName, email, password } = req.body;
  const userArray = {
    _id: uuidv4(),
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    cartArray: [],
    wishList: [],
    purchasedHistory: [],
  };
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const emailUsers = await db.collection("users").findOne({ email: email });
    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailValidation.test(email)) {
      return res
        .status(400)
        .json({ status: 400, message: "E-mail isn't valid" });
    }
    if (!email || !password || !firstName || !lastName) {
      return res
        .status(409)
        .json({ status: 409, message: "Add Your Credintials" });
    }
    if (emailUsers) {
      return res
        .status(400)
        .json({ status: 400, message: "User Already Exsits" });
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    userArray.password = cryptedPassword;
    const users = await db.collection("users").insertOne(userArray);
    users
      ? res.status(200).json({
          status: 200,
          data: req.body,
          message: "User Created",
          id: userArray._id,
        })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

module.exports = {
  getItems,
  getCompanies,
  getUsers,
  createUser,
  logInUser,
};
