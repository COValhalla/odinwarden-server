// Add identity and securenote after the other models
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
  name: {
    type: String,
  },
  dateUpdated: {
    type: Date,
    default: Date.now,
  },
  cardholderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
  },
  brand: {
    type: String,
  },
  expirationMonth: {
    type: String,
    enum: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ],
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
});

module.exports = Items = mongoose.model('Cards', CardSchema);
