const express = require("express");
require("dotenv").config();
const protectRoute = require("./protectRoute");
const {
  getSignup,
  postSignup,
  loginUser,
  logOut,
  forgotPassword,
  resetPassword,
} = require("../controller/authController");

//auth routes
const authRouter = express.Router();

authRouter.route("/signup").get(getSignup).post(postSignup);
authRouter
  .route("/login")
  .get((req, res) => {
    res.json({ message: "Not allowed" });
  })
  .post(loginUser);
authRouter.route("/logout").get(protectRoute, logOut);

authRouter.route("/forgotPassword").post(forgotPassword);
authRouter.route("/forgotPassword/:resetToken").post(resetPassword);

module.exports = authRouter;
