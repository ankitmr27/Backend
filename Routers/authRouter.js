const express = require("express");
require("dotenv").config();
const userModel = require("../models/userModel.js");

//auth routes
const authRouter = express.Router();

function getSignup(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignup(req, res) {
  let dataObject = req.body;
  //console.log("backend", dataObject);
  let user = await userModel.create(dataObject);
  res.json({
    message: "user Signed up",
    data: dataObject,
  });
  console.log("created user:", user);
}

authRouter.route("/signup").get(getSignup).post(postSignup);

module.exports = authRouter;
