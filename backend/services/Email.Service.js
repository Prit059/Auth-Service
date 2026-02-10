// services/Email.Service.js
const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or use SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // Use App Password for Gmail
  }
});

const sendVerificationEmail = async (email, token) => {
  try {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Verify Your Email',
      html: `
        <h1>Email Verification</h1>
        <p>Click the link below to verify your email:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link expires in 24 hours.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${email}`);
    
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};

const sendResetPasswordEmail = async (email, token) => {
  try {
    const resetPasswordUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Reset Password',
      html: `
        <h1>Reset Password</h1>
        <p>Click the link below to reset your password:</p>
        <a href="${resetPasswordUrl}">Reset Password</a>
        <p>This link expires in 1 hour.</p>
      `
    };
    
    await transporter.sendMail(mailOptions);
    console.log(`Reset password email sent to ${email}`);

  } catch (error) {
    console.error('Error sending reset password email:', error);
  }
}


module.exports = {
  sendVerificationEmail,
  sendResetPasswordEmail,
};