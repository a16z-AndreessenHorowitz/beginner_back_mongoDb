const nodemailer = require("nodemailer");

module.exports.sendMail=(email,subject,html)=>{
  const transporter = nodemailer.createTransport({
  service: "gmail",
    auth: { //là tài khoản xác thực hai lớp
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
  });

  const mailOption = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOption, function (error,info) {
    if (error) {
      console.log("Lỗi") 
    }})
}