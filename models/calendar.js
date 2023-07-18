const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calendarEntrySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  time: { type: String },
  activity: { type: String, required: true }
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

const calendarSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  entries: [calendarEntrySchema],
}, {
  timestamps: true,
  toJSON: { virtuals: true }
});

module.exports = mongoose.model('Calendar', calendarSchema);