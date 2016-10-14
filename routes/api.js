const express = require ('express')
const router = express.Router()

// router.use('/search', require('./search'))
router.use('/saved', require('./saved'));

// router.use('/audio-analyse', require('./audio-analyse'));

module.exports = router
