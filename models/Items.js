// Add identity and securenote after the other models
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Items = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  login: [{ type: Schema.Types.ObjectId, ref: 'Login' }],
  card: [{ type: Schema.Types.ObjectId, ref: 'Card' }],
});

module.exports = Items = mongoose.model('Items', ItemsSchema);
