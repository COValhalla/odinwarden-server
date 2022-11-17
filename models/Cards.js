// Add identity and securenote after the other models
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
  cardholderName: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  brand: {
    type: String,
  },
  expirationMonth: {
    type: String,
  },
  expirationYear: {
    type: Number,
  },
  cvv: {
    type: Number,
  },
  note: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = Items = mongoose.model('Cards', CardSchema);
