const express = require("express");

const HomeRouter = express.Router();
HomeRouter.route("/").get((req, res) => {
  res.json({
    message: "Home page",
  });
  //console.log(req);
  console.log({ message: "Home page" });
});
// // home page routes
// const HomeRouter = express.Router();
// app.use("/", HomeRouter);
// HomeRouter.route("/getUser").get(getAllUsers);

HomeRouter.route("/getUser").get((req, res) => {
  res.json({ message: "successful getUser router" });
});

HomeRouter.route("/getId").get((req, res) => {
  res.json({ message: "Id route" });
});

module.exports = HomeRouter;
