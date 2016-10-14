const express = require('express')
const router = express.Router()
const Micro = require('../models/models')


router.post(`/audio-analyze/`, (req, res) => {
  Micro.audioAnalyze(req.body.string, res.handle);
  // .then((data) => {res.send(data)})
  // .catch((err) => {res.status(400).send(err)})
})

router.delete(`/:id`,(req,res) => {
  let { id } = req.params;
  Micro.deleted(id)
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
}),

router.post('/',(req,res) => {
  // console.log('req.body: ', req.body)
  Micro.saveAnalysis(req.body)
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
}),

router.get('/',(req,res) => {
  Micro.getSaved()
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
})

module.exports = router;
