const express = require ('express')
const router = express.Router()

router.use('/search', require('./search'))
router.use('/saved', require('./saved'))

module.exports = router
