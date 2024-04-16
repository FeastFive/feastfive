const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

const sendMail = (mailAddress, subject, mailBody) => {
  return new Promise((resolve, reject) => {
    if (!mailAddress) {
      console.error("Alıcı adresi belirtilmemiş.");
    }
    //Create a transporter
    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 25,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    //Defining the mail options
    const mailOptions = {
      from: "noreply@feastfive.com",
      to: mailAddress,
      subject: subject,
      html: mailBody,
    };

    //Sending the email
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

const sendActivationEmail = (mailAddress) => {
  const mailBody = `
  <!DOCTYPE html>
  <html>
  <head><title>FeastFive Activation</title>
  </head>
  <body>
  <div> 
  <h3>Monterey Account Activation</h3>
  <p>This e-mail is sent to upon your FeastFive account registration.</p>
  <p></p>
  <p>Thanks!</p><b>FeastFive</b>
  </div>
  </body>
  </html>`;

  const subject = "FeastFive Account Activation";

  return sendMail(mailAddress, subject, mailBody);
};

module.exports = {
  sendMail,
  sendActivationEmail,
};
