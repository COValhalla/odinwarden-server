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
  expirationMonth: {
    enum: [
      '01 - January',
      '02 - February',
      '03 - March',
      '04 - April',
      '05 - May',
      '06 - June',
      '07 - July',
      '08 - August',
      '09 - September',
      '10 - October',
      '11 - November',
      '12 - December',
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
