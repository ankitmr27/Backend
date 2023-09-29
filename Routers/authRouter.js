const express = require("express");
require("dotenv").config();
const userModel = require("../models/userModel.js");

//auth routes
const authRouter = express.Router();

function getSignup(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignup(req, res) {
  try {
    let dataObject = req.body;
    //console.log("backend", dataObject);
    let user = await userModel.create(dataObject);
    res.json({
      message: "user Signed up",
      data: dataObject,
    });
    console.log("created user:", user);
  } catch (e) {
    console.log(e);
  }
}

async function loginUser(req, res) {
  if (req.body.email) {
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        //bcrypt has be to taken care of
        if (user.password === req.body.password) {
          //setting the cookie as true for logged in user
          res.cookie("isLoggedIn", true, { httpOnly: true }); // sending single cookie
          return res.json({
            message: "User Found",
            userDetails: req.body,
          });
        } else {
          return res.json({ message: "Invalid Credential" });
        }
      } else {
        return res.json({ message: "User not found" });
      }
    } catch (e) {
      console.log(e);
    }
  } else {
    res.json({ message: "Empty email found" });
  }
}

authRouter.route("/signup").get(getSignup).post(postSignup);
authRouter.route("/login").post(loginUser);

module.exports = authRouter;
