const express = require('express')
const router = express.Router()
const calendarsCtrl = require('../../controllers/api/calendars')

// // GET /api/calendars
// router.get('/', calendarsCtrl.index)

//GET /api/calendars/:date
router.get('/:date', calendarsCtrl.show)

// POST /api/calendars/new
router.post('/new', calendarsCtrl.create)

// // DELETE /api/calendars/:id
// router.delete('/:id', calendarsCtrl.delete)

// // PUT /api/calendars/:id
// router.put('/:id', calendarsCtrl.update)

module.exports = router