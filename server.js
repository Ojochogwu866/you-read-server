if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport-config");
const { User } = require("./models");
const flash = require("express-flash");
const session = require("express-session");

initializePassport(
  passport,
  (email) => User.find((user) => user.email === email),
  (id) => User.find((user) => user.id === id)
);

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      id: Date.now().toString(),
      email: req.body.email,
      password: hashedPassword,
    });
    req.login(user, (e) => {
      if (e) throw err;
    });
    res.redirect("/login");
  } catch (e) {
    res.redirect("/register");
  }
});
app.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
  })
);
app.listen(3000);
