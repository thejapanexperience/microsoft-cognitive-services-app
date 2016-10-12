const express = require('express')
const router = express.Router()
const Twitter = require('twitter')
require("dotenv").config()

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret ,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

router.get('/:topic',(req,res) => {
  let {topic} = req.params;
  client.get('search/tweets', {q: `${topic}`}, function(error, tweets, response) {
     if (error) return res.status(400).send(error);
     res.send(tweets.statuses);
  });
})

module.exports = router
