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

  router.post('/local/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      console.log('login');
      console.log('info', info); // TODO use info
      if (err) {
        console.log('err', err);
        next(err);
      } else if (!user) {
        console.log('no user');
        res.json({
          success: false
        });
      } else {
        console.log('bout ta reqlogin');
        req.logIn(user, (error) => {
          console.log('reqlogin');
          if (error) {
            console.log('reqlogin err, error');
            next(error);
          }
          console.log('success');
          console.log('user', user);
          console.log('requser', req.user);
          res.json({
            success: true,
            user: req.user
          });
        });
      }
    })(req, res, next);
  });

  return router;
};
