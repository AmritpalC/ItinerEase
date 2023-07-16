const express = require('express')
const router = express.Router()
const itinerariesCtrl = require('../../controllers/api/itineraries')

// GET /api/itineraries
router.get('/', itinerariesCtrl.index)

//GET /api/itineraries/:id
router.get('/:id', itinerariesCtrl.show)

// POST /api/itineraries/new
router.post('/new', itinerariesCtrl.create)

// DELETE /api/itineraries/:id
router.delete('/:id', itinerariesCtrl.delete)

// PUT /api/itineraries/:id
router.put('/:id', itinerariesCtrl.update)

module.exports = router