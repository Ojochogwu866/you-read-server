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
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.email }).then((existingUser) => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({
            name: profile.displayName,
            email: profile.emails[0].value,
          })
            .save()
            .then((user) => done(null, user));
        }
      });
    }
  )
);
