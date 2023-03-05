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
    phoneNumber: req.body.phoneNumber,
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

router.post("/:_id/books/current-reading", async (req, res) => {
  const { bookTitle, bookAuthor, totalPages, bookGenre } = req.body;
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.bookReading.currentReading.push({
      bookTitle,
      bookAuthor,
      totalPages,
      bookGenre,
      pagesLeft: totalPages,
      bookCompleted: false,
      daysLeft: null,
    });

    const updatedUser = await user.save();
    return res.status(201).json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/:userId/books/:bookId/currentReading", async (req, res) => {
  const userId = req.params._id;
  const bookId = req.params.bookReading.currentReading._id;
  const currentReadingUpdates = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const book = user.bookReading.currentReading.id(bookId);
    if (!book) {
      return res.status(404).send({ error: "Book not found" });
    }
    book.set(currentReadingUpdates);
    await user.save();
    res.send(book);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
});

router.post("/:_id/books/book-stats", async (req, res) => {
  const { totalRead, monthlyRead, readPerDay, pagesPerWeek } = req.body;
  const user = await User.findById(req.params._id);
  if (!user) return res.status(404).send("User not found");
  user.bookReading.bookStats = {
    ...user.bookReading.bookStats,
    totalRead: totalRead,
    monthlyRead: monthlyRead,
    readPerDay: readPerDay,
    pagesPerWeek: pagesPerWeek,
  };
  const savedUser = await user.save();
  res.status(200).json(savedUser);
});

router.post("/:_id/books/book-goals", async (req, res) => {
  const { yearTotalRead, completed, pagesPerWeek } = req.body;
  const user = await User.findById(req.params._id);
  if (!user) return res.status(404).send("User not found");
  user.bookReading.bookGoals = {
    ...user.bookReading.bookGoals,
    yearTotalRead: yearTotalRead,
    completed: completed,
    pagesPerWeek: pagesPerWeek,
  };
  const savedUser = await user.save();
  res.status(200).json(savedUser);
});
module.exports = router;
