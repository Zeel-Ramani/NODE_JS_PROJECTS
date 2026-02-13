const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "zeelramani@gmail.com",
    pass: "zeel1234", 
  },
});

exports.sendMail = async function (receiverEmail, otp) {
  try {
    const info = await transporter.sendMail({
      from: '"Zeel Ramani" <zeelramani@gmail.com>',
      to: receiverEmail,
      subject: "Reset Password OTP ✔",
      text: `Your reset password OTP is: ${otp}`,
      html: `
        <h3>Hello,</h3>
        <p>Your reset password OTP is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 5 minutes.</p>
        <p>If you didn't request this, ignore this email.</p>
      `,
    });

    console.log(" OTP email sent successfully to:", receiverEmail);
  } catch (error) {
    console.error(" Error sending OTP email:", error.message);
  }
};