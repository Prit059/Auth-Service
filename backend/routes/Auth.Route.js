const express = require('express');
const {login,register} = require('../controllers/Auth.Controller');
const { protect } = require('../middleware/Auth.Middleware')
const router = express.Router();


router.post('/register',register);
router.post('/login',login);

module.exports = router;