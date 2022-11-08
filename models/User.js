const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', UserSchema);
