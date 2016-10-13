const express = require('express')
const router = express.Router()

router.get('/:topic',(req,res) => {
  let {topic} = req.params;
  client.get('search/tweets', {q: `${topic}`}, function(error, tweets, response) {
     if (error) return res.status(400).send(error);
     res.send(tweets.statuses);
  });
})

module.exports = router
