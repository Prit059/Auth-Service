const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy
const GithubStrategy = require('passport-github2').Strategy;
const User = require('../models/User.model');


//  ---------- ## Google Strategy ## -----------

passport.use(new GoogleStrategy({
  clientID:process.env.GOOGLE_CLIENT_ID,
  clientSecret:process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:process.env.GOOGLE_CALLBACK_URL,
  passReqToCallback: true, // for custom error handing
},
async (req,accesstoken,refreshtoken,profile,done) => {
  try {
    // check user exit with this google.id
    let user = await User.findOne({ googleId: profile.id });

    if(user){
      user.lastlogin = Date.now();
      await user.save();
      return done(null,user);
    }

    // if user exit with this email
    user = await User.findOne({ email: profile.emails[0].value });

    if(user){
      user.googleId = profile.id;
      user.emailverified = true;
      user.avatar = profile.photos[0].value;
      user.lastlogin = Date.now();
      await user.save();
      return done(null,user);
    }

    // create new user
    const newUser = await User.create({
      name: profile.displayName,
      email: profile.emails[0].value,
      googleId: profile.id,
      emailverified: true,
      avatar: profile.photos[0].value,
      lastlogin: Date.now(),
      loginCount: 1,
      isActive: true,
    })
    return done(null,newUser);

  } catch (error) {
    return done(error, null);
  }
}
));


// ------------------ ## GITHUB STRATEGY ## --------------

passport.new(new GithubStrategy({
  clientID:process.env.GITHUB_CLIENT_ID,
  clientSecret:process.env.GITHUB_CLIENT_SECRET,
  callbackURL:process.env.GITHUB_CALLBACK_URL,
  passReqToCallback: true,
  scope: ['user:email'] // Request email access
},
async(req, accesstoken, refreshtoken, profile, done) => {
  try {
    let email = null; // ---- why NULL -- Github may not always provide email.
    if(profile.emails && profile.emails.length > 0){
      email = profile.emails[0].value;
    }
    
    // user exit with this githubID
    let user = await User.findOne({ githubId: profile.id });

    if(user){
      user.lastlogin = Date.now();
      await user.save();
      return done(null,user);
    }

    // If email exit with this email
    if(email){
      user = await User.findOne({ email });

      if(user){           // Link Github account to exiting user.
        user.githubId = profile.id;
        user.emailverified = true;
        user.avatar = profile.photos[0].value;
        user.lastlogin = Date.now();
        await user.save();
        return done(null,user);
      }
    }

    // create user
    const newUser = await User.create({
      name: profile.displayName || profile.username,
      email: email || `${profile.username}@github.local`,  // FallBack email
      githubId: profile.id,
      emailverified: !!email,  // verified if email provide
      avatar: profile.photos[0].value,
      lastlogin: Date.now(),
      loginCount: 1,
      isActive: true
    });

    return done(null,newUser);
  } catch (error) {
    return done(error,null);
  }
}
));

// ---------------- SERIALIZE --------------

passport.serializeUser((user, done) => {
  done(null,user.id);
});

// --------------- DESERIALIZE -------------

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null,user);
  } catch (error) {
    done(error,null);
  }
});

module.exports = passport;