module.exports.getCookies = function getCookies(req, res) {
  let cookies = req.cookies;
  console.log("cookies:", cookies);
  res.send("Cookies received");
};

module.exports.setCookies = function setCookies(req, res) {
  res.cookie("isLoggedIn", false, {
    maxAge: 1000 * 60 * 60 * 24, // age of cookies
    secure: true, // means its only uses HTTPS
    httpOnly: true, // stops the cookie access from frontend of webbrowser
  });
  res.cookie("isPrimeMember", true, { httpOnly: true });
  res.send("cookies has been set");
};
