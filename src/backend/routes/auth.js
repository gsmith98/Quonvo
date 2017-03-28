const express = require('express');
const models = require('../models');

const router = express.Router();
const User = models.User;

module.exports = (passport) => {
  // You will use passport to authenticate in the future
  router.post('/local/signup', (req, res) => {
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
    .catch(err => res.json({
      success: false,
      error: err
    }));
  });

  // TODO is there good reason for this custom authenticate handler?
  // TODO what do the next(err) lines do?
  router.post('/local/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        next(err);
      } else if (!user) {
        res.json(Object.assign({ success: false }), info);
      } else {
        req.logIn(user, (error) => {
          if (error) {
            next(error);
          } else {
            res.json({ success: true, user });
          }
        });
      }
    })(req, res, next);
  });

  return router;
};
