const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WhistleSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User' // assuming you have a User model
  },
  coordinates: {
    type: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Whistle = mongoose.model('Whistle', WhistleSchema);

module.exports = Whistle;
