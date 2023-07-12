const express = require('express')
const router = express.Router()
const itinerariesCtrl = require('../../controllers/api/itineraries')

// GET /api/itineraries
router.post('/new', itinerariesCtrl.create)

module.exports = router