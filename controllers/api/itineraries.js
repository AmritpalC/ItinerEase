const Itinerary = require('../../models/itinerary')

module.exports = {
  create,
  index,
  show
}

async function create(req, res) {
  console.log(req.body)
  console.log(req.user)
  try {
  const itinerary = await Itinerary.create(req.body)
  res.json(itinerary)
  } catch (err) {
    console.log(err)
    // Bad request
    res.status(400).json(err)
  }
}

async function index(req, res) {
  const itineraries = await Itinerary.find({}).sort('destination')
  res.json(itineraries)
}

async function show(req, res) {
  const itinerary = await Itinerary.findById(req.params.id)
  res.json(itinerary)
}