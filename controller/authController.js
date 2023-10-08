const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
const path = require("node:path");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utility/sendEmail.js");
const { getHtmlString } = require("../utility/htmlString.js");

module.exports.getSignup = function getSignup(req, res) {
  try {
    console.log("getSignup", __dirname);
    // let path1 = "/home/ankit-maurya/Documents/backend/public/";
    // let path2 = "/home/ankit-maurya/Documents/backend/controller/";
    // let relPath = path.join(path.relative(path2, path1), "index.html");
    // console.log(relPath);
    res.sendFile(path.join(__dirname, "../public/index.html"));
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
    console.log(dataObject);
    if (dataObject.password != dataObject.confirmPassword) {
      res.json({ message: "password mismatched" });
    }
    if (!dataObject.password) {
      res.json({ message: "password can't be blank" });
    }
    let User = await userModel.findOne({ email: dataObject.email });
    console.log(User);
    if (User) {
      res.json({ message: "Email already exists" });
    }
    //console.log("backend", dataObject);
    let user = await userModel.create(dataObject);
    console.log("created user:", user);
    sendEmail("signup", user);
    res.json({
      message: "user Signed up",
      data: dataObject,
    });
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
        const match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let uid = user["_id"]; // unique id
          // this function will include header itself default
          let JWTtoken = jwt.sign({ payload: uid }, JWT_KEY); // by default- HMAC-SHA256 but to specify{algorithm:'RS256'}
          //setting the cookie as true for logged in user
          res.cookie("isLoggedIn", JWTtoken, { httpOnly: true }); // sending single cookie and seetting it http true to stop access from frontend
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

module.exports.logOut = function logOut(req, res) {
  res.cookie("isLoggedIn", "-");
  res.json({ message: "User logged out" });
};

module.exports.forgotPassword = async function forgotPassword(req, res) {
  try {
    let email = req.body.email;
    let user = await userModel.find({ email: email });
    //console.log(user.length);
    if (user.length) {
      //console.log(user);
      // send nodemailer reset link to user
      let token = jwt.sign({ payload: email }, JWT_KEY, {
        expiresIn: 5 * 60,
      });
      // store the reset token to database
      const resUpdate = await userModel.updateOne(
        { email: email },
        { resetToken: token }
      );

      if (!resUpdate.acknowledged) {
        res.json({ message: "Error occurred while updating" });
      }

      const url = `${req.protocol}://${req.get(
        "host"
      )}/forgotPassword/${token}?email=${email}`;

      //console.log(url);
      let htmlString = getHtmlString("reset password", {
        email: email,
        resetToken: token,
        resetURL: url,
      });
      // send the reset link to user email address and set the reset token to null
      //console.log(typeof sendResetEmail);
      const info = await sendEmail(email, "reset password", htmlString);
      //console.log(sendResetEmail);
      res.json({
        message: "reset token created!",
      });
      //
    } else {
      res.json({ message: "User not found" });
    }
  } catch (e) {
    console.log(e);
  }
};
