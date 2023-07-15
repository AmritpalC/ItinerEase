const Itinerary = require('../../models/itinerary')

module.exports = {
  create,
  index,
  show,
  delete: deleteItinerary
}

async function create(req, res) {
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
  try {
    const userId = req.user._id
    const itineraries = await Itinerary.find({ user: userId }).sort('destination')
    res.json(itineraries)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

async function show(req, res) {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
    res.json(itinerary)
    console.log(itinerary)
  } catch (error) {
    console.log("Error message ->", error)
  }
}

async function deleteItinerary(req, res) {
  try {
    const deletedItinerary = await Itinerary.findByIdAndDelete(req.params.id)
    res.json(deletedItinerary)
    console.log('itinerary deleted successfully, -> ', deletedItinerary)
  } catch (err) {
    res.status(400).json(err)
  }
}