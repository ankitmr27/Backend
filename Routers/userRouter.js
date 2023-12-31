const express = require("express");
require("dotenv").config();
const { getCookies, setCookies } = require("../controller/userController.js");

const userRouter = express.Router();

userRouter.route("/getCookies").get(getCookies);
userRouter.route("/setCookies").get(setCookies);

module.exports = userRouter;
