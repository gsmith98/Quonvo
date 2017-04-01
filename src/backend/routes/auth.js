const express = require('express');
const models = require('../models');

const router = express.Router();
const User = models.User;

module.exports = (passport) => {
  // You will use passport to authenticate in the future
  router.post('/auth/signup', (req, res) => {
    new User({
      email: req.body.email.toLowerCase(),
      password: req.body.password,
      name: req.body.name.toLowerCase(),
      interests: req.body.interests
    })
    .save()
    .then(user => res.json({ success: true, user }))
    .catch(error => res.json({ success: false, error }));
  });

  // TODO is there good reason for this custom authenticate handler?
  // TODO what do the next(err) lines do?

  const customAuth = (req, res, next) => (err, user, info) => {
    if (err) {
      next(err);
    } else if (!user) {
      res.json(Object.assign({ success: false }, info));
    } else {
      req.logIn(user, (error) => {
        if (error) {
          next(error);
        } else {
          res.json({ success: true, user });
        }
      });
    }
  };
  router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', customAuth(req, res, next))(req, res, next);
  });

  router.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
  router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', customAuth(req, res, next))(req, res, next);
  });

  return router;
};
