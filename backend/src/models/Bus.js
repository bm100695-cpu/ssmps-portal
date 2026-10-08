const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNumber: {
        type: String,
        required: true,
        unique: true
    },
    vehicleNumber: {
        type: String,
        required: true,
        unique: true
    },
    capacity: {
        type: Number,
        required: true
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    routeStops: [{
        stopName: String,
        pickupTime: String,
        dropTime: String
    }],
    currentLocation: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    },
    isTracking: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
