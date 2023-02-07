const express = require("express");
const router = express.Router();
const User = require("../model/users");

router.post("/register", async (req, res) => {
  const user = User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
