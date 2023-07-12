const Itinerary = require('../../models/itinerary')

module.exports = {
  create
}

async function create(req, res) {
  console.log(req.body)
  console.log(req.user)
  console.log(req.params)
  try {
  const itinerary = await Itinerary.create(req.body)
  res.json(itinerary)
  } catch (err) {
    console.log(err)
    // Bad request
    res.status(400).json(err)
  }
}