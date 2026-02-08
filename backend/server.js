const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');
const AuthRoute = require('./routes/Auth.Route');
const OAuthRoute = require('./routes/OAuth.Route');


const app = express();

app.use(cors());
app.use(express.json());

// Define routes



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
