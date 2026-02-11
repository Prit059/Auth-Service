const User = require('../models/User.model');
const emailservice = require('../services/Email.Service');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const generateToken = (userId) => {
  return jwt.sign({ id:userId }, process.env.JWT_SECRET, {expiresIn: "7d"});
};

const registerService = async (userdata) => {
  try {
    const finduser = await User.findOne({ email: userdata.email });
    if(finduser){
      console.log('User already exists');
      throw new Error('User already exists');
    }

    const salt = await bcrypt.genSalt(10); // generate salt
    const hashpassword = await bcrypt.hash(userdata.password, salt); // hash password with salt example : password123 -> asd$#asdasd12312
    userdata.password = hashpassword;

    const user = await User.create({
      email: userdata.email,
      password: userdata.password,
      firstname: userdata.firstname,
      lastname: userdata.lastname,
      role: userdata.role || 'user',
    });

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; 
    user.verificationTokenExpiry = verificationTokenExpiry;
    user.verificationToken = verificationToken;
    await user.save();

    await emailservice.sendVerificationEmail(user.email, user.verificationToken);
    // console.log("Service: User create.");
    

    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      token: generateToken(user.id)
    }
    
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

const loginService = async (userdata) => {
  try {
    const finduser = await User.findOne({ email: userdata.email });
    if(!finduser){
      console.log('User not found.');
      throw new Error('User not found.');
    }

    const isMatch = await finduser.comparePassword(userdata.password);
    if(!isMatch){
      console.log('Invalid password.');
      throw new Error('Invalid password.');
    }

    if(!finduser.emailverified){
      console.log('Email not verified.');
      throw new Error('Email not verified.');
    }

    return {
      id: finduser.id,
      email: finduser.email,
      firstname: finduser.firstname,
      lastname: finduser.lastname,
      role: finduser.role,
      token: generateToken(finduser.id),
    }
  } catch (error) {
    throw error;
  }
}

const verifyEmail = async (token) => {
  try {
    const finduser = await User.findOne({ verificationToken: token, verificationTokenExpiry: { $gt: Date.now() } });
    if(!finduser){
      console.log('Invalid or expired token.');
      throw new Error('Invalid or expired token.');
    }

    finduser.isActive = true;
    finduser.emailverified = true;
    finduser.verificationToken = undefined;
    finduser.verificationTokenExpiry = undefined;
    await finduser.save();

    return true;

  } catch (error) {
    throw error;
  }
}

const forgotpassword = async (email) => {
  try {
    
    const finduser = await User.findOne({ email: email });

    if(finduser){
      const resetToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
      const resetTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour
      finduser.passwordResetToken = hashedToken;
      finduser.passwordResetTokenExpiry = resetTokenExpiry;
      await finduser.save();
      
      await emailservice.sendResetPasswordEmail(finduser.email, resetToken);
    }
    return true;
  } catch (error) {
    throw error;
  }
}

const resetpassword = async (token, newpassword) => {
  try {
    const finduser = await User.findOne({ passwordResetToken: token, passwordResetTokenExpiry: { $gt: Date.now() } });
    if(!finduser){
      console.log('Invalid or expired token.');
      throw new Error('Invalid or expired token.');
    }

    if(newpassword < 8){
      throw new Error('Password must be at least 8 characters.');
    }

    const salt = await bcrypt.genSalt(10); // generate salt
    const hashpassword = await bcrypt.hash(newpassword, salt); // hash password with salt example : password123 -> asd$#asdasd12312
    finduser.password = hashpassword;
    finduser.passwordResetToken = undefined;
    finduser.passwordResetTokenExpiry = undefined;
    await finduser.save();

    return true;
  } catch (error) {
    throw error;
  }
}

const getprofile = async (userid) => {
  try {
    const user = await User.findById(userid).select("-password");

    
    return user;
  } catch (error) {
    
  }
}

module.exports = {
  registerService,
  loginService,
  verifyEmail,
  forgotpassword,
  resetpassword,
  getprofile
}