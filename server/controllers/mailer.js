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

const sendActivationEmail = (_id, mailAddress) => {
  console.log(token);
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
    <p>Press <a href="http://localhost:3000/verify/${token}">here</a> to verify your account.</p>
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
};
