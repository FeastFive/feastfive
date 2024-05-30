const nodemailer = require("nodemailer");

const sendMail = (mailAddress, subject, mailBody) => {
  return new Promise((resolve, reject) => {
    if (!mailAddress) {
      console.error("Alıcı adresi belirtilmemiş.");
      reject(new Error("Alıcı adresi belirtilmemiş."));
      return;
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Define mail options
    const mailOptions = {
      from: "feasfive5@gmail.com",
      to: mailAddress,
      subject: subject,
      html: mailBody,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("E-posta gönderme hatası:", error);
        reject(error);
      } else {
        console.log("E-posta gönderildi:", info.response);
        resolve(info.response);
      }
    });
  });
};

//SOURCE CODE: https://safwan-du16.medium.com/email-verification-with-node-js-and-nodemailer-3a6363b31060
const sendActivationEmail = (uniqueId, mailAddress) => {
  const mailBody = `
  <!DOCTYPE html>
<html>
<head>
  <title>FeastFive Activation</title>
</head>
<body>
  <div> 
    <h3>FeastFive Account Activation</h3>
    <p>This e-mail is sent to you upon your FeastFive account registration.</p>
    <p>Press <a href="http://localhost:4000/api/users/verify/${uniqueId}">here</a> to verify your account.</p>
    <p></p>
    <p>Thanks!</p>
    <b>FeastFive</b>
  </div>
</body>
</html>
`;
  const subject = "FeastFive Account Activation";

  return sendMail(mailAddress, subject, mailBody);
};

const forgotPasswordEmail = (uniqueId, mailAddress) => {
  const mailBody = `
  <!DOCTYPE html>
<html>
<head>
  <title>FeastFive Recover Password</title>
</head>
<body>
  <div> 
    <h3>FeastFive Recover Password</h3>
    <p>This email is sent to you to recover your FeastFive password.</p>
    <p>Press <a href="http://localhost:4000/api/users/forgot/${uniqueId}">here</a> to recover your account.</p>
    <p></p>
    <p>Thanks!</p>
    <b>FeastFive</b>
  </div>
</body>
</html>
`;
  const subject = "FeastFive Recover Password";

  return sendMail(mailAddress, subject, mailBody);
};
const forgotPasswordRestaurantEmail = (uniqueId, mailAddress) => {
  const mailBody = `
  <!DOCTYPE html>
<html>
<head>
  <title>FeastFive Recover Password</title>
</head>
<body>
  <div> 
    <h3>FeastFive Recover Password</h3>
    <p>This email is sent to you to recover your FeastFive password.</p>
    <p>Press <a href="http://localhost:4000/api/restaurants/forgot/${uniqueId}">here</a> to recover your account.</p>
    <p></p>
    <p>Thanks!</p>
    <b>FeastFive</b>
  </div>
</body>
</html>
`;
  const subject = "FeastFive Recover Password";

  return sendMail(mailAddress, subject, mailBody);
};

const sendActivationRestaurantEmail = (uniqueId, mailAddress) => {
  const mailBody = `
  <!DOCTYPE html>
<html>
<head>
  <title>FeastFive Activation</title>
</head>
<body>
  <div> 
    <h3>FeastFive Account Activation</h3>
    <p>This e-mail is sent to you upon your FeastFive account registration.</p>
    <p>Press <a href="http://localhost:4000/api/restaurants/verify/${uniqueId}">here</a> to verify your account.</p>
    <p></p>
    <p>Thanks!</p>
    <b>FeastFive</b>
  </div>
</body>
</html>
`;
  const subject = "FeastFive Account Activation";

  return sendMail(mailAddress, subject, mailBody);
};

module.exports = {
  sendMail,
  sendActivationEmail,
  sendActivationRestaurantEmail,
  forgotPasswordEmail,
  forgotPasswordRestaurantEmail,
};
