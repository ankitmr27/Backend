const express = require("express");
const app = express();
require("dotenv").config();
const userModel = require("./models/userModel.js");
const cookieParser = require("cookie-parser");

app.listen(process.env.PORT, () => {
  console.log("Listening of http://localhost:3000");
});

app.use(express.json());
app.use(cookieParser());

const userRouter = express.Router();
app.use("/user", userRouter);

const router = express.Router();
app.use("/home", router);

router.route("/").get((req, res) => {
  res.json({
    message: "Home page",
  });
  //console.log(req);
  console.log({ message: "Home page" });
});

router.route("/getUser").get((req, res) => {
  res.json({ message: "successful getUser router" });
});

router.route("/getId").get((req, res) => {
  res.json({ message: "Id route" });
});

// // home page routes
// const HomeRouter = express.Router();
// app.use("/", HomeRouter);
// HomeRouter.route("/getUser").get(getAllUsers);

function getSignup(req, res) {
  res.sendFile("/public/index.html", { root: __dirname });
}

async function postSignup(req, res) {
  let dataObject = req.body;
  //console.log("backend", dataObject);
  await userModel.create(dataObject);
  res.json({
    message: "user Signed up",
    data: dataObject,
  });
}

//auth routes
const authRouter = express.Router();
app.use("/auth", authRouter);

authRouter.route("/signup").get(getSignup).post(postSignup);

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
