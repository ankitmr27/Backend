// protect route middleware so just use (req,res,next) to make any function middleware
// next is keyword to pass the control of the req-res cycle
async function protectRoute(req, res, next) {
  console.log(req.cookies);
  if (req.cookies.isLoggedIn) {
    next();
  } else {
    return res.json({ message: "operation not allowed" });
  }
}

module.exports = protectRoute;
