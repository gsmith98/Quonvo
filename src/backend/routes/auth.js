const express = require('express');
const models = require('../models');

const router = express.Router();
const User = models.User;

module.exports = (passport) => {
  // You will use passport ot authenticate in the future
  router.post('/local/signup', (req, res) => {
    if (req.body.password !== req.body.passwordRepeat) {
      return res.send("Passwords didn't match");
    }
    const user = new User({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      interests: req.body.interests
    });
    return user.save()
    .then(newUser => res.json({
      success: true,
      user: newUser
    }))
    .catch(err => res.send(err));
  });

  router.post('/local/login',
  passport.authenticate('local'),
  (req, res) => {
    res.json({
      success: true,
      user: req.user
    });
  });

  return router;
};
