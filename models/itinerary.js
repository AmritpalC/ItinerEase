const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const placeSchema = require('./placeSchema');
// const restaurantSchema = require('./restaurantSchema');

const budgetItemSchema = new Schema({
  name: { type: String },
  cost: { type: Number, required: true, default: 0 }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

const itinerarySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date },
  transport: { type: String },
  accommodation: { type: String },
  // countdown: { type: Number },
  budget: [budgetItemSchema],
  // placesToVisit: [placeSchema],
  // restaurants: [restaurantSchema]
  placesToVisit: [ { type: String } ],
  restaurants: [ { type: String } ]
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

itinerarySchema.virtual('countdown').get(function() {
  const currentDate = new Date()
  const holidayDate = this.date
  if (currentDate && holidayDate) {
    const timeDiff = holidayDate.getTime() - currentDate.getTime()
    // So I convert the difference in milliseconds to seconds, then hours, then days
    // rounding up, so it shows the current number of days until the holiday
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24))
    if (daysRemaining >= 0) {
      return daysRemaining
    } else {
      return 'Holiday has passed'
    }
  }
  return 'No date entered'
})

module.exports = mongoose.model('Itinerary', itinerarySchema);