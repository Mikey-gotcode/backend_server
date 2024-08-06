const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commuterSchema = new Schema({
    userID: { type: String, required: true },
    Name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    Password: { type: String, required: true },
    whistles: {
        coordinates: {
            lng: { type: Number, required: true },
            ltd: { type: Number, required: true }
        }
    }
});

module.exports = mongoose.model('Commuter', commuterSchema);
