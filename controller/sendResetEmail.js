const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ankitm.ac.in@gmail.com",
    pass: "Ankit756123",
  },
});

module.exports.sendResetEmail = async function sendResetEmail(email, token) {
  console.log(email, " - ", token);
  const mailOptions = {
    from: "ankitm.ac.in@gmail.com",
    to: email,
    subject: "Sending Email using Node.js",
    text: "That was easy!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error sending email");
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
