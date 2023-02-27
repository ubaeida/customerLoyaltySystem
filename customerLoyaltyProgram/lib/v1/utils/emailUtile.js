var nodemailer = require("nodemailer");

const sendEmail = async (userEmail, email) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "loyaltysystem2023@gmail.com",
      pass: "gujdfdveogauorlm",
    },
  });
  var mailOptions = {
    from: "loyaltysystem2023@gmail.com",
    replyTo: 'noreply@loyaltysystem.com',
    to: `${userEmail}`,
    subject: `${email.subject}`,
    html: `${email.text}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('error from send email',error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendEmail,
};
