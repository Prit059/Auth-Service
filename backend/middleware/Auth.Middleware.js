const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const protect = async (req,res,next) => {
  try {
    
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(401).json({
        success: false,
        message: "No token provide."
      })
    }

    const token = authHeader.split(" ")[1];
    if(!token){
      return res.status(401).json({
        success: false,
        message: "No token provide."
      })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if(!decoded.id){
        return res.status(401).json({
          success: false,
          message: "User not found"
        });
      }

      const user = await User.findById(decoded.id).select("-password");
      if(!user){
        return res.status(401).json({
          success: false,
          message: "User not Found."
        })
      }

      if(!user.isActive){
        return  res.status(403).json({
          success: false,
          message: "User account is deactivated."
        });
      }

      req.user = user;
      next();
    } catch (error) {
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          success: false,
          message: "Token expired, please login again" 
        });
      }
      
      return res.status(401).json({ 
        success: false,
        message: "Invalid token" 
      });
      
    }
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: "Authentication server error"
    });
  }
}

module.exports = { protect }