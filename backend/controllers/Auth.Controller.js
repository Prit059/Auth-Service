const User = require('../models/User.model');
const AuthService = require('../services/Auth.Service');
const validators = require('../utils/validators');
const register = async (req, res) => {
  try {
    // console.log("Received data:", req.body);
    const error = validators.validateRegister(req.body);
    if(error.length > 0){
      return res.status(400).json({ error: error });
    }

    const user = await AuthService.registerService(req.body);
    console.log("user create.");
    

    res.status(201).json({
      success: true,
      message: "User Successfully Registered.",
      data: { userId: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname,role: user.role, token: user.token }
    });
  } catch (error) {
    console.log("Sign Up Error",error);
    res.status(400).json({ error: error.message });
  }
}

const login = async (req, res) => {
  try {
    const error = validators.validateLogin(req.body);
    if(error.length > 0){
      return res.status(400).json({ error: error });
    }

    const user = await AuthService.loginService(req.body);

    res.status(200).json({
      success: true,
      message: "User Successfully Logged In.",
      data: { userId: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname,role:user.role, token: user.token }
    })

  } catch (error) {
    console.log("Login Error",error);
    res.status(400).json({ error: error.message });
  }
}

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const result = await AuthService.verifyEmail(token);

    if(!result){
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }
    
    res.json({
      success: true,
      message: 'Email verified'
    });
  } catch (error) {
    res.status(400).json({ 
      success: false,
      error: error.message 
    });
  }
}

const forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;

    await AuthService.forgotpassword(email);

    res.json({
      success: true,
      message: 'Password reset link sent to your email.'
    });
    
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    })
  }
}

const resetpassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newpassword } = req.body;

    const result = await AuthService.resetpassword(token, newpassword);

    if(!result){
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    res.json({
      success: true,
      message: 'Password reset successful.'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    })
  }
}

const getprofile = async (req, res) => {
  try {
    const user = await AuthService.getprofile(req.user.id);

    if(!user){
      return res.status(404).json({ error: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    return res.status(500).json({ error: "Server Error."});
  }
}

module.exports = {
  register,
  login,
  verifyEmail,
  forgotpassword,
  resetpassword,
  getprofile
}