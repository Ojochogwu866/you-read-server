const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserEmail, getUserById) {
  const userValidation = async (email, password, userverify) => {
    const user = getUserEmail(email);
    if (user == null) {
      return userverify(null, false, { message: "User Email not found" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return userverify(null, user);
      } else {
        return userverify(null, false, { message: "Password not correct" });
      }
    } catch (e) {
      console.log(e);
      return userverify(e);
    }
  };
  passport.use(new LocalStrategy({ username: "email" }, userValidation));
  passport.serializeUser((user, userverify) => userverify(null, user.id));
  passport.deserializeUser((id, userverify) => {
    return userverify(null, getUserById(id));
  });
}

module.exports = initialize;
