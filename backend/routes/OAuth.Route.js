const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();


// ----------- GOOGLE OAUTH --------------

router.get('/google', 
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',  // Forces Account selection
    state: true // auto-generates state
  })
);

// Google OAuth Callback
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`,
    session: false, // We don`t want session, we want JWT
  }),
  (req,res) => {
    const token = jwt.sign(
      {id: req.user._id},
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);


// ----------- GITHUB OAUTH --------------

router.get('/github', 
  passport.authenticate('github', {
    scope: ['user:email'],
    session: false 
  })  
);

// Google OAuth Callback
router.get('/github/callback',
  passport.authenticate('github', {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=github_auth_failed`,
    session: false, // We don`t want session, we want JWT
  }),
  (req,res) => {
    const token = jwt.sign(
      {id: req.user._id},
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

module.exports = router;