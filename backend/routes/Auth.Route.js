const express = require('express');
const {login,register,verifyEmail,forgotpassword,resetpassword,getprofile} = require('../controllers/Auth.Controller');
const { protect } = require('../middleware/Auth.Middleware');
const { rateLimitMiddleware } = require('../middleware/rateLimit.Middleware')
const router = express.Router();


router.post('/register',register);
router.post('/login',rateLimitMiddleware,login);
router.get('/verify-email/:token',verifyEmail);
router.post('/forgot-password',rateLimitMiddleware,forgotpassword);
router.post('/reset-password/:token',resetpassword);
router.get('/profile',protect,getprofile);

module.exports = router;