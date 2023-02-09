const express = require("express");
const app = express();
const router = express.Router();
const User = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation");
const passport = require("passport");
//register-user
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //check if user is registered
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exist");
  //hashpassword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  //createUser
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login
router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist) return res.status(400).send("Email or Password Invalid");
  const validPassword = await bcrypt.compare(
    req.body.password,
    userExist.password
  );
  if (!validPassword) return res.status(400).send("Invalid Password");

  //create and assign a token
  const token = jwt.sign({ _id: User._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
  res.send("Signed In Successfully");
});
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/reader/profile",
    failureFlash: true,
    successFlash: "Successfully logged in!",
  })
);

module.exports = router;
