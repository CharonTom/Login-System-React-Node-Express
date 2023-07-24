const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10) // hashage du mdp
    .then((hash) => {
      const user = new User({
        userID: req.body.userID,
        email: req.body.email,
        password: hash,
        date: req.body.date,
      });
      user
        .save() // Ajout de l'utilsateur dans la db
        .then(() => res.status(201).json({ message: "User created !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ userID: req.body.userID })
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
