const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/login', function (req, res) {
  User.authenticate(req.body.email, req.body.password, function (err, user) {
    if (err || !user) {
      res.status(401).send('Wrong email address or password');
    } else {
      req.session.userId = user._id;
      res.json({
        user: user
      });
    }
  })
});

router.post('/logout', function (req, res) {
  if (req.session) {
    req.session.destroy();
  }
});

router.post('/join', function (req, res, next) {
  if (req.body.email && req.body.username && req.body.password) {
    let userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password
    }
    User.create(userData, function (err, user) {
      if (err) {
        return next(err);
      } else {
        req.session.userId = user._id;
        res.json({
          user: user
        });
      }
    })
  }
});

router.get('/profile', function (req, res) {
  if (req.session.userId) {
    User.findOne({ _id: req.session.userId }, function (err, user) {
      res.json({
        user: user
      });
    });
  } else {
    res.status(401).send('You must be logged in first.')
  }
});

module.exports = router;