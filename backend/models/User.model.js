const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
  },
  lastname: {
    type: String,
    trim: true,
  },
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
  },

  googleId: {
    type: String,
    sparse: true, // allow multiple null values
    default: null,
  },
  githubId: {
    type: String,
    sparse: true, // allow multiple null values
    default: null,
  },

  emailverified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  verificationTokenExpiry: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetTokenExpiry: {
    type: Date,
  },
  avatar: {
    type: String,
  },

  lastlogin: {
    type: Date,
  },
  loginCount: {
    type: Number,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  oauthTokens: {
    google: {
      accessToken: String,
      refreshToken: String,
    },
    github: {
      accessToken: String,
      refreshToken: String,
    }
  }
},
{ timestamps: true }
);

// UserSchema.index({ email: 1 });
// UserSchema.index({ googleId: 1 });
// UserSchema.index({ githubId: 1});
UserSchema.index({ verificationToken: 1 });
UserSchema.index({ passwordResetToken: 1 });

UserSchema.methods.comparePassword = async function(password){
  if(!this.password) return false;
  return await bcrypt.compare(password, this.password);
}

UserSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(this.password, salt);
    this.password = hashpassword;
    next();
  } catch (error) {
    next(error);
  }
})


const User = mongoose.model('User', UserSchema);

module.exports = User;