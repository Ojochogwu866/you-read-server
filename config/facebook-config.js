const passport = require("passport");
const User = require("../model/users");
const FacebookStrategy = require("passport-facebook").Strategy;
const dotenv = require("dotenv");
dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "email"],
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        const existingUser = await User.findOne({ facebookId: profile.id });
        if (existingUser) {
          return cb(null, existingUser);
        } else {
          let email = "";
          if (profile.emails && profile.emails.length > 0) {
            email = profile.emails[0].value;
          }
          const newUser = new User({
            facebookId: profile.id,
            name: profile.displayName,
            email,
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
