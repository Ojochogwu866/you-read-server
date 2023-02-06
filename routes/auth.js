const express = require("express");
const router = express.Router();
const User = require("../model/user");

router.post("/register", (req, res) => {
  const user = newUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
});

module.exports = router;
