const express = require('express')
const router = express.Router()
const itinerariesCtrl = require('../../controllers/api/itineraries')

// GET /api/itineraries
router.get('/', itinerariesCtrl.index)

//GET /api/itineraries/:id
router.get('/:id', itinerariesCtrl.show)

// POST /api/itineraries/new
router.post('/new', itinerariesCtrl.create)

module.exports = router