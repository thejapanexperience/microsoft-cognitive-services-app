const express = require('express')
const router = express.Router()
const Tweet = require('../models/twitter')


router.post('/',(req,res) => {
  Tweet.saveTweet(req.body)
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
})

router.delete(`/:id`,(req,res) => {
  let {id} = req.params;
  Tweet.deleted(id)
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
})

router.get('/',(req,res) => {
  Tweet.getSaved()
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
})

module.exports = router
