const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const HomeRouter = require("./Routers/Homerouter");
const authRouter = require("./Routers/authRouter");
const userRouter = require("./Routers/userRouter");

app.listen(process.env.PORT, () => {
  console.log("Listening of http://localhost:3000");
});

app.use(express.json());
app.use(cookieParser());

app.use("/home", HomeRouter);
app.use("/auth", authRouter);
app.use("/getUser", userRouter);
