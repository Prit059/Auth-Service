const User = require('../models/User.model');
const emailservice = require('../services/Email.Service');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

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

    const user = await User.create({
      email: userdata.email,
      password: userdata.password,
      firstname: userdata.firstname,
      lastname: userdata.lastname,
    });

    // const verificationToken = crypto.randomBytes(32).toString("hex");
    // const verificationTokenExpiry = Date.now() + 24 * 60 * 60 * 1000; 
    // user.verificationTokenExpiry = verificationTokenExpiry;
    // user.verificationToken = verificationToken;
    // await user.save();

    // await emailservice.sendVerificationEmail(user.email, user.verificationToken);

    return {
      id: user.id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
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

    return {
      id: finduser.id,
      email: finduser.email,
      firstname: finduser.firstname,
      lastname: finduser.lastname,
      token: generateToken(finduser.id),
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerService,
  loginService
}