const express = require('express');
const router = express.Router();
const search = require('../helpers/rank-checker/googleSearch');

router.post('/web-search', async function (req, res) {
  if (req.body.keyword) {
    let results = await search.searchGoogle({
      keyword: req.body.keyword
    })
    res.json({
      results: results
    })
  } else {
    res.status(400).send('Type keyword')
  }
});

module.exports = router;