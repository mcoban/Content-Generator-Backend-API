const express = require('express');
const router = express.Router();
const { extract } = require('article-parser');
const Website = require('../models/website');
const axios = require('axios');

router.post('/', function (req, res) {
  if (req.body.url) {
    extract(req.body.url)
      .then(article => {
        article.content = article.content.replace(/<\/?html>/ig, '');
        article.content = article.content.replace(/<\/?body>/ig, '');
        res.json({
          article: article
        })
      });
  } else {
    res.status(401).send('Url is not specified');
  }
});

router.post('/post/:id', function (req, res) {
  if (req.body.title && req.body.description && req.body.content) {
    Website.findOne({ _id: req.params.id }, function (err, website) {
      if (website) {
        if (website.user == req.session.userId) {
          axios.post(website.url, {
            username: website.username,
            password: website.password,
            title: req.body.title,
            description: req.body.description,
            content: req.body.content
          })
            .then(_res => _res.data)
            .then(_res => {
              res.send(_res)
            })
          res.send(website)
        } else {
          res.status(401).send('this not belongs to you baby ;)')
        }
      } else {
        res.status(401).send('website is not found.')
      }
    })
  }
})

module.exports = router;