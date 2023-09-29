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

// express.json() parses incoming request, post data in json string format and query parameters in url encoded string and make
// them available in req.body(post data for post http request) and req.params(query parameters)
// like @ get uncoded as %40
app.use(express.json());
app.use(cookieParser());

app.use("/home", HomeRouter);
app.use("/auth", authRouter);
app.use("/getUser", userRouter);

// middleware functions has access to req-res cycle and by using next inbuilt function we pass the
// modified req-res to incoming middleware means which will get executed next
app.user("/other", (req, res, next) => {
  //......
  next();
});
