const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "zeelramani@gmail.com",
    pass: "12345",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function sendOtpEmail(toEmail, otp) {
  if (!toEmail) throw new Error("Email is undefined");

  let mailOptions = {
    from: '"Admin Panel" <zeelramani@gmail.com>',
    to: toEmail,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  let info = await transporter.sendMail(mailOptions);
  console.log("Email sent:", info.response);
}

module.exports = { sendOtpEmail };
