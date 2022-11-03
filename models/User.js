const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hint: {
    type: String,
    required: true,
  },
  items: {
    type: Schema.Types.ObjectId,
    ref: 'Items',
  },
});
