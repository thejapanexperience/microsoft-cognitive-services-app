const express = require('express')
const router = express.Router()

const Micro = require('../models/models')


router.post('/', (req, res) => {
  Micro.textToSpeech(req.body.str, req.body.id)
  .then( res.send() )
  .catch((err) => {res.status(400).send(err)})
})

module.exports = router;
