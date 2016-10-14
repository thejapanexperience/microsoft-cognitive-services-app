const express = require('express')
const router = express.Router()

const Micro = require('../models/models')


router.get('/', (req, res) => {
  Micro.textToSpeech()
  .then( res.send() )
  .catch((err) => {res.status(400).send(err)})
})

module.exports = router;
