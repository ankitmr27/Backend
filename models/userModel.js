const mongoose = require("mongoose");
require("dotenv").config();
const emailValidater = require("email-validator");
const bcrypt = require("bcrypt");

const db_link = process.env.DB_URL;

// create a default size of 5 database connections
mongoose
  .connect(db_link, { maxPoolSize: 10 })
  .then(function (db) {
    console.log("db connected");
    //console.log(db);
  })
  .catch(function (err) {
    console.log(err);
  });

// creating schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: function () {
      return emailValidater.validate(this.email);
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 1,
  },
  resetToken: {
    type: String,
    default: null,
  },
});

// triggers before save event entry is done
// this can only be accessed while non-array function
userSchema.pre("save", async function () {
  console.log("Before saving in data base:", this);
  // it will invalidate this field so won't be stored in database
  let salt = await bcrypt.genSalt();
  let hashedString = await bcrypt.hash(this.password, salt);
  this.password = hashedString;
});

// triggers after an save event entry is done
userSchema.post("save", function (doc) {
  console.log("After saving in data base:", doc);
});
//creating a model/collection to populate with data with same schema
const userModel = mongoose.model("userModel", userSchema);

// async function getAllUsers(req, res) {
//   let users = await userModel.find();
//   res.json({
//     message: "list of all users",
//     data: users,
//   });
// }

// (async function createUser() {
//   let user = {
//     name: "Ramurq",
//     email: "the99t@gamil.com",
//     password: "1234589711",
//     confirmPassword: "1234589711",
//   };
//   let data = await userModel.create(user);
//   console.log(data);
// })();

module.exports = userModel;
