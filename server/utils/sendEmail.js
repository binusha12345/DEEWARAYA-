// server/utils/sendEmail.js
const nodemailer = require("nodemailer");

const sendEmail = async ({ toEmail, subject, htmlContent }) => {
  try {
    // ✅ Create transporter with Brevo
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // false for port 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // ✅ Email options
    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.EMAIL_FROM}>`,
      to: toEmail,
      subject: subject,
      html: htmlContent,
    };

    // ✅ Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully to:", toEmail);
    console.log("📧 Message ID:", info.messageId);

  } catch (error) {
    console.error("❌ Email sending failed:", error.message);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;