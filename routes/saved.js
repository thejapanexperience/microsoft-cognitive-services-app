const express = require('express')
const router = express.Router()
const Micro = require('../models/models')


router.post('/',(req,res) => {
  Micro.saveAnalysis(req.body)
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
}),

router.delete(`/:id`,(req,res) => {
  let { id } = req.params;
  Micro.deleted(id)
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
}),

router.get('/',(req,res) => {
  Micro.getSaved()
  .then((data) => {res.send(data)})
  .catch((err) => {res.status(400).send(err)})
})

module.exports = router
