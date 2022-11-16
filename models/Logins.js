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
  },
  password: {
    type: String,
  },
  url: [String],
  note: {
    type: String,
  },
});

module.exports = Items = mongoose.model('Logins', LoginSchema);
