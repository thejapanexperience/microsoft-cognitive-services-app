const express = require ('express')
const router = express.Router()

// router.use('/search', require('./search'))
router.use('/saved', require('./saved'))

router.use('/textToSpeech', require('./textToSpeech'))

module.exports = router
