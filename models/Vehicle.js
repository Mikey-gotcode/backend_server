const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
    vehicleNo: { type: String, required: true },
    companyName: { type: String, required: true, unique: true },
    vehicleRegistrationNumber: { type: String, required: true, unique: true },
    routes: {
        to: { type: String, required: true },
        fro: { type: String, required: true }
    },
    fareRanges: { type: String, required: true },
    docks: [{ type: String, required: true }],
    password: { type: String, required: true }
}, {
    timestamps: true // Enable automatic creation of `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
