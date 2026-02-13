const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/passport');
require('dotenv').config();
const connectDB = require('./config/database');
const AuthRoute = require('./routes/Auth.Route');
const OAuthRoute = require('./routes/OAuth.Route');


const app = express();

app.use(cors());
app.use(express.json());

// ---------- Session middleware (REQUIRED for Passport) ---------


// ---------- Define routes -------------
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());


app.use("/auth",AuthRoute);
app.use("/oauth",OAuthRoute);



const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  })
