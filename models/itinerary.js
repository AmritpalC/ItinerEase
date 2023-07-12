const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const placeSchema = require('./placeSchema');
// const restaurantSchema = require('./restaurantSchema');

const budgetItemSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Schema.Types.Decimal128, required: true, default: 0 }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

const itinerarySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  destination: { type: String, reqiured: true },
  date: { type: Date },
  transport: { type: String },
  accommodation: { type: String },
  countdown: { type: Number },
  budget: [budgetItemSchema],
  // placesToVisit: [placeSchema],
  // restaurants: [restaurantSchema]
  placesToVisit: [ { type: String } ],
  restaurants: [ { type: String } ]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

module.exports = mongoose.model('Itinerary', itinerarySchema);