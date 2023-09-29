const jwt = require("jsonwebtoken");
const JWT_KEY = process.env.JWT_KEY;
// protect route middleware so just use (req,res,next) to make any function middleware
// next is keyword to pass the control of the req-res cycle
async function protectRoute(req, res, next) {
  console.log(req.cookies);
  if (req.cookies.isLoggedIn) {
    let isValidToken = jwt.verify(req.cookies.isLoggedIn, JWT_KEY);
    if (isValidToken) {
      next();
    } else {
      res.json({ message: "user not verified" });
    }
  } else {
    return res.json({ message: "operation not allowed" });
  }
}

module.exports = protectRoute;
