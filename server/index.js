"use strict";

const express = require("express");
const morgan = require("morgan");
const {
  getCompanies,
  getItems,
  getUsers,
  createUser,
  logInUser,
} = require("./handler");
const PORT = 4000;

express()
  .use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("tiny"))
  .use(express.static("./server/assets"))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/", express.static(__dirname + "/"))

  .get("/api/companies", getCompanies)
  // .post("/api/companies", addCompany)
  // .delete("/api/companies/:_id", deleteCompany)
  // .put("/api/companies/:_id", updateCompany)

  .get("/api/items", getItems)
  // .post("/api/items", addItem)
  // .delete("/api/items/:_id", deleteItem)
  // .put("/api/items/:_id", updateItem)

  .get("/api/users", getUsers)
  .post("/api/userLogin", logInUser)
  .post("/api/user", createUser)
  // REST endpoints?
  .get("/bacon", (req, res) => res.status(200).json("🥓"))

  .listen(PORT, () => console.info(`Listening on port ${PORT}`));
