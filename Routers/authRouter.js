const express = require("express");
require("dotenv").config();
const {
  getSignup,
  postSignup,
  loginUser,
} = require("../controller/authController");

//auth routes
const authRouter = express.Router();

authRouter.route("/signup").get(getSignup).post(postSignup);
authRouter.route("/login").post(loginUser);

module.exports = authRouter;
