module.exports.getHtmlString = function getHtmlString(subject, data) {
  if (subject == "reset password") {
    const resetURL = `http://localhost:300/auth/forgotPassword/:${data.resetToken}?email=${data.email}`;
    return `<a href=${resetURL}>Reset Link</a>`;
  } else if (subject == "signup") {
    return "<h1>Welcome to our website</h1>";
  }
};
