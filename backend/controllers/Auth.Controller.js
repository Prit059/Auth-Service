const User = require('../models/User.model');
const AuthService = require('../services/Auth.Service');
const validators = require('../utils/validators');
const register = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const error = validators.validateRegister(req.body);
    // ifc

    const user = await AuthService.registerService(req.body);

    res.status(201).json({
      success: true,
      message: "User Successfully Registered.",
      data: { userId: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, token: user.token }
    });
  } catch (error) {
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
      data: { userId: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname, token: user.token }
    })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
}