const express = require("express");
const router = express.Router();
const User = require("../model/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { registerValidation, loginValidation } = require("../validation");
const passport = require("passport");
require("../config/passport");
require("../config/google-config");
require("../config/facebook-config");

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
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);
const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
};
router.get("/failed", (req, res) => {
  res.send("Failed");
});
router.get("/success", isLoggedIn, (req, res) => {
  res.send(`Welcome ${req.user.email}`);
});

router.post("/books/:_id", async (req, res) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) return res.status(404).send("User not found");
    _id: new mongoose.Types.ObjectId(),
      (user.data.bookReading.currentBook.totalPages = req.body.pagesLeft);
    user.data.bookReading.currentBook.bookGenre = req.body.daysLeft;
    user.data.bookReading.currentBook.bookTitle = req.body.bookTitle;
    const updatedUser = await user.save();
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
// router.post("/books/_:id", async (req, res) => {
//   try {
//     const user = await User.findById(req.params._id);
//     if (!user) return res.status(404).send("User not found");
//     const { bookTitle, bookAuthor, bookGenre, totalPages } = req.body;
//     const newBook = {
//       _id: new mongoose.Types.ObjectId(),
//       bookTitle,
//       bookAuthor,
//       bookGenre,
//       totalPages,
//       pagesLeft: totalPages,
//       bookCompleted: false,
//       daysLeft: 0,
//     };
//     user.data.bookReading.currentBook.push(newBook);
//     const updatedUser = await user.save();
//     res.send(updatedUser);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });
// const isLoggedIn = (req, res, next) => {
//   req.user ? next() : res.sendStatus(401);
// };
// router.get("/profile", isLoggedIn, (req, res) => {
//   res.render("profile.ejs", { user: req.user });
// });
module.exports = router;
