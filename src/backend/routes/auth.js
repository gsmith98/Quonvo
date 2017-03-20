const express = require('express');
const models = require('../models');

const router = express.Router();
const User = models.User;

module.exports = (passport) => {
  // You will use passport ot authenticate in the future
  router.post('/local/signup', (req, res) => {
    if (req.body.password !== req.body.passwordRepeat) {
      res.send("Passwords didn't match");
    }
    const user = new User({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      interests: req.body.interests
    });
    user.save()
    .then(newUser => res.json({
      success: true,
      user: newUser
    }))
    .catch(err => res.send(err));
  });

  router.post('/local/login', (req, res, next) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        next(err);
      }
      if (!user) {
        res.json({
          success: false
        });
      }
      // The return below is only because of the Lint rules. May be subject
      // to change
      req.logIn(user, (error) => {
        if (error) { next(error); }
        res.json({
          success: true,
          user: req.user
        });
      });
    })(req, res, next);
  });
  return router;
};
