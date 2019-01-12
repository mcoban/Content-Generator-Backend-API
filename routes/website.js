const express = require('express');
const router = express.Router();
const Website = require('../models/website');

router.get('/list', function (req, res) {
  let uid = req.session.userId;
  Website.find({ user: uid }, function (err, websites) {
    if (err) {
      res.status(400).send(err.message);
    } else {
      res.json({
        websites: websites
      });
    }
  })
});

router.post('/add', function (req, res) {
  if (req.body.sitename && req.body.url && req.body.username && req.body.password) {
    const websiteData = {
      user: req.session.userId,
      sitename: req.body.sitename,
      url: req.body.url,
      username: req.body.username,
      password: req.body.password
    }
    Website.create(websiteData, function (err, website) {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.json({
          err: 0,
          website: website
        });
      }
    });
  }
});

router.put('/:id', function (req, res) {
  if (req.body.sitename && req.body.url && req.body.username && req.body.password) {
    Website.findByIdAndUpdate(req.params.id, {
      user: req.session.userId,
      sitename: req.body.sitename,
      url: req.body.url,
      username: req.body.username,
      password: req.body.password
    }, { new: true }, function (err, website) {
      if (!err && website) {
        res.json({
          website: website
        });
      } else {
        res.status(400).send(err);
      }
    });
  }
});

router.delete('/:id', function (req, res) {
  Website.remove({ user: req.session.userId, _id: req.params.id}, function (err) {
    if (!err) {
      res.json({
        deleted: 1
      });
    }
  });
})

module.exports = router;