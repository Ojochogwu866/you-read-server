const passport = require("passport");
const UserService = require("../index");
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
    async (accessToken, refreshToken, profile, done) => {
      const id = profile.id;
      const email = profile.emails[0].value;
      const name = profile.name.givenName + profile.name.familyName;
      const source = "google";
      const currentUser = await UserService.getUserByEmail({
        email,
      });
      if (!currentUser) {
        const newUser = await UserService.addGoogleUser({
          id,
          email,
          name,
        });
        return done(null, newUser);
      }
      if (currentUser.source != "google") {
        return done(null, false, {
          message: `You have previously signed up with a different signin method`,
        });
      }
      currentUser.lastVisited = new Date();
      return done(null, currentUser);
    }
  )
);
