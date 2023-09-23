const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderItemSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date },
  completed: { type: Boolean, default: false }
}, {
  timestamps: true,
});

// const reminderSchema = new Schema({
//   itinerary: { type: Schema.Types.ObjectId, ref: 'Itinerary', required: true },
//   name: { type: String, required: true },
//   list: [reminderItemSchema],
// }, {
//   timestamps: true,
// });

module.exports = reminderItemSchema;