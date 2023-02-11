const passport = require("passport");
const User = require("../model/users");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      callbackURL: "http://localhost:3000/api/user/auth/google/callback",
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingUser = await User.findOne({
          email: profile.emails[0].value,
        });
        if (existingUser) {
          return cb(null, existingUser);
        } else {
          const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          await newUser.save();
          return cb(null, newUser);
        }
      } catch (error) {
        return cb(error);
      }
    }
  )
);
