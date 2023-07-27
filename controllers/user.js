const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  User.findOne({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  })
    .then((existingUser) => {
      if (existingUser) {
        // L'utilisateur avec le même nom d'utilisateur ou la même adresse e-mail existe déjà
        if (existingUser.username === req.body.username) {
          return res.status(409).json({
            field: "username",
            message: "This username is already taken",
          });
        } else if (existingUser.email === req.body.email) {
          return res.status(409).json({
            field: "email",
            message: "This email is already registered",
          });
        }
      } else {
        bcrypt
          .hash(req.body.password, 10)
          .then((hash) => {
            const user = new User({
              username: req.body.username,
              email: req.body.email,
              password: hash,
              date: req.body.date,
            });
            user
              .save()
              .then(() => res.status(201).json({ message: "User created !" }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: `Can't find this user` });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              message: `the user ID or the password seems to be wrong`,
            });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "TOKEN", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.home = (req, res, next) => {
  res.status(200).json({ message: "Bienvenue sur la home page" });
};
