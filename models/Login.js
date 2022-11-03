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

module.exports = Login = mongoose.model('Login', LoginSchema);
