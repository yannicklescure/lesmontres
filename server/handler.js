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
  console.log(req.query);
  const { category } = req.query;

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const companies = await db.collection("companies").find().toArray();
    let data = companies;
    // console.log(data);

    const items = await db.collection("items").find().toArray();
    // console.log(items);

    if (category) {
      const products = items.filter(
        (item) => item.category.toLowerCase() === category
      );
      // console.log(products);
      const companiesIds = [];
      products.forEach((product) => {
        if (!companiesIds.includes(product.companyId))
          companiesIds.push(product.companyId);
      });
      // console.log(companiesIds);
      const filteredCompanies = [];
      companiesIds.forEach((companiesId) => {
        const filteredCompany = companies.filter(
          (company) => company._id === companiesId
        );
        filteredCompanies.push(filteredCompany[0]);
      });
      // console.log(filteredCompanies);

      data = filteredCompanies;
    }

    data
      ? res.status(200).json({ status: 200, data, message: "success" })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log("Error Getting Companies", err);
    res.status(500).json({ status: 500, message: err });
  } finally {
    client.close();
  }
};

const getItem = async (req, res) => {
  console.log(req.params);

  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const _id = parseInt(req.params._id);
    const result = await db.collection("items").findOne({ _id });
    console.log(result);
    let data = result;

    result
      ? res.status(200).json({ status: 200, data, message: "success" })
      : res.status(409).json({ status: 409, message: "Item not found" });
  } catch (err) {
    console.log("Error Getting Items", err);
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

    if (req.query.search) {
      let searchResults = [];
      data.forEach((item) => {
        if (item.name.toLowerCase().includes(req.query.search.toLowerCase())) {
          searchResults.push(item);
        }
      });
      data = searchResults;
      console.log(searchResults);
    }

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
        .json({ status: 400, message: "Add your email and password" });
    }
    const loginAuth = await db.collection("users").findOne({ email });
    if (loginAuth) {
      const loginPassword = await bcrypt.compare(password, loginAuth.password);
      if (loginPassword) {
        const {
          firstName,
          lastName,
          email,
          _id,
          cartArray,
          wishList,
          purchasedHistory,
        } = loginAuth;

        return res.status(200).json({
          status: 200,
          message: "User Logged In",
          data: {
            firstName,
            lastName,
            email,
            _id,
            cartArray,
            wishList,
            purchasedHistory,
          },
        });
      } else
        return res
          .status(400)
          .json({ status: 400, message: "Passwords don't match" });
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
    firstName,
    lastName,
    email,
    password,
    cartArray: [],
    wishList: [],
    purchasedHistory: [],
  };
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const emailUsers = await db.collection("users").findOne({ email });
    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailValidation.test(email)) {
      return res
        .status(400)
        .json({ status: 400, message: "E-mail isn't valid" });
    }
    if (!email || !password || !firstName || !lastName) {
      return res
        .status(409)
        .json({ status: 409, message: "Add your credentials" });
    }
    if (emailUsers) {
      return res
        .status(400)
        .json({ status: 400, message: "User already exists" });
    }
    const cryptedPassword = await bcrypt.hash(password, 10);
    userArray.password = cryptedPassword;
    const users = await db.collection("users").insertOne(userArray);
    users
      ? res.status(200).json({
          status: 200,
          data: {
            firstName,
            lastName,
            email,
            _id: userArray._id,
            cartArray,
            wishList,
            purchasedHistory,
          },
          message: "User Created",
        })
      : res.status(409).json({ status: 409, message: "ERROR" });
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
const updateCart = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { email, cartArray } = req.body;
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const emailUsers = await db.collection("users").findOne({ email });

    console.log(emailUsers);
    if (emailUsers) {
      const result = await db.collection("users").updateOne(
        { email },
        {
          $set: {
            cartArray,
          },
        }
      );
      console.log(cartArray);
      console.log(result);
      return res.status(200).json({
        status: 200,
        message: `${cartArray} was added to the cart`,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add Cart #: ${cartArray} to the cart, user not found`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
const updatePurchaseHistory = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  const { email, purchaseHistory } = req.body;
  try {
    await client.connect();
    const db = client.db("LesMontres");
    const emailUsers = await db.collection("users").findOne({ email });

    if (emailUsers) {
      const result = await db.collection("users").updateOne(
        { email },
        {
          $push: {
            purchaseHistory: purchaseHistory,
          },
        }
      );
      return res.status(200).json({
        status: 200,
        message: ` was added to the History of purchases`,
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add Purchase to the cart, user not found`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};
const addToWishlist = async (req, res) => {
  const client = new MongoClient(MONGO_URI, option);
  try {
    await client.connect();
    const { email, itemId } = req.body;
    const db = client.db("LesMontres");
    const emailUsers = await db.collection("users").findOne({ email });
    if (emailUsers) {
      await db
        .collection("users")
        .updateOne({ email }, { $push: { wishlist: itemId } });
      return res
        .status(200)
        .json({ status: 200, message: `${itemId} was added to the Wishlist` });
    } else {
      return res.status(400).json({
        status: 400,
        message: `Not able to add Item #: ${itemId} to wishlist, user not found`,
      });
    }
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

module.exports = {
  getItem,
  getItems,
  getCompanies,
  getUsers,
  createUser,
  logInUser,
  updateCart,
  addToWishlist,
  updatePurchaseHistory,
};
