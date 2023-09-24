const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderItemSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date },
  completed: { type: Boolean, default: false }
}, {
  timestamps: true,
});

module.exports = reminderItemSchema;