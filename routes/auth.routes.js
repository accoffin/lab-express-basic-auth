const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const { Error } = require("mongoose");
const session = require("express-session");

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.render("auth/signup", { errorMessage: "All fields are mandatory." });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    User.create({ email, password: hashedPassword })
      .then((userFromDB) => {
        res.render("profile");
      })
      .catch((err) => {
        if (err.code === 11000) {
          res.render("auth/signup", {
            errorMessage: "User with that email already exists.",
          });
        } else if (err instanceof Error.ValidationError) {
          res.render("auth/signup", {
            errorMessage: err.message,
          });
        } else {
          next(err);
        }
      });
  }
});

router.get("/login", (req, res, next) => {
  red.render("auth/login");
});

router.post("/login", async (req, res, next) => {
  console.log("Session", req.session);
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.render("auth/signup", { errorMessage: "All fields are mandatory." });
  } else {
    try {
      const userFromDB = await User.find({ email });
      console.log(userFromDB);
    } catch (err) {
      next(err);
    }
    User.findOne({ email })
      .then((userFromDB) => {
        if (userFromDB === null) {
          res.render("auth/login", {
            errorMessage: "No such user exists.",
          });
        } else {
          const passwordMatch = bcrypt.compareSync(
            password,
            userFromDB.password
          );
          if (!passwordMatch) {
            res.render("auth/login", {
              errorMessage: "Incorrect password.",
            });
          } else {
            res.render("profile");
          }
        }
      })
      .catch((err) => next(err));
  }
});

module.exports = router;
