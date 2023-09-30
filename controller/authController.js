const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;

module.exports.getSignup = function getSignup(req, res) {
  try {
    console.log("getSignup");
    res.sendFile("/home/ankit-maurya/Documents/Food-App/public/index.html");
    // , {
    //   root: __dirname,
    // })
    //res.send("hi");
    //res.sendFile("/public/index.html", { root: __dirname });}
  } catch (e) {
    console.log(e);
  }
};

module.exports.postSignup = async function postSignup(req, res) {
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
};

module.exports.loginUser = async function loginUser(req, res) {
  if (req.body.email) {
    try {
      let user = await userModel.findOne({ email: req.body.email });
      if (user) {
        //bcrypt has be to taken care of
        if (user.password === req.body.password) {
          let uid = user["_id"]; // unique id
          // this function will include header itself default
          let JWTtoken = jwt.sign({ payload: uid }, JWT_KEY); // by default- HMAC-SHA256 but to specify{algorithm:'RS256'}
          //setting the cookie as true for logged in user
          res.cookie("isLoggedIn", JWTtoken, { httpOnly: true }); // sending single cookie
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
};
