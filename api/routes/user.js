const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
router.get("/", async (req, res, next) => {
  let results = await User.find({});
  res.status(200).json({
    users: results,
  });
});

router.post("/signup", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((result) => {
                console.log(result);

                res.status(201).json({
                  message: "user created",
                });
              })
              .catch((err) => {
                return res.status(500).json({
                  error: err,
                });
              });
          }
        });
      } else {
        return res.status(409).json({
          message: "Mail exists",
        });
      }
    });
});
router;
router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (err) {
          return res.status(401).json({
            message: "auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user.email,
              id: user._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "auth successfull",
            token: token,
          });
        }
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: "auth failed",
      });
    });
});

router.delete("/:userId", function (req, res, next) {
  User.findByIdAndDelete(req.params.userId)
    .exec()
    .then(() => {
      res.status(200).json({
        message: "deleted user",
      });
    });
});
module.exports = router;
