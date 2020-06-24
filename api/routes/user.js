const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../../models/User");

router.post("/signup", (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
});

module.exports = router;
