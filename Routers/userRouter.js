const express = require("express");
require("dotenv").config();

const userRouter = express.Router();

function getCookies(req, res) {
  let cookies = req.cookies;
  console.log("cookies:", cookies);
  res.send("Cookies received");
}

function setCookies(req, res) {
  res.cookie("isLoggedIn", false, {
    maxAge: 1000 * 60 * 60 * 24,
    secure: true,
    httpOnly: true,
  });
  res.cookie("isPrimeMember", true, { httpOnly: true });
  res.send("cookies has been set");
}

userRouter.route("/getCookies").get(getCookies);
userRouter.route("/setCookies").get(setCookies);

module.exports = userRouter;
