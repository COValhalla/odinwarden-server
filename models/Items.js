// Add identity and securenote after the other models
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LoginSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  url: [String],
  notes: [String],
});

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
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
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
    required: true,
  },
  cvv: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
  },
});

const ItemsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  login: [LoginSchema],
  card: [CardSchema],
});

module.exports = Items = mongoose.model('Items', ItemsSchema);
