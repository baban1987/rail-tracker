const mongoose = require('mongoose');

const locoPositionSchema = new mongoose.Schema({
    loco_no: {
        type: Number,
        required: true,
    },
    train_no: {
        type: Number,
        default: null,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    speed: Number,
    event: String,
    station: String,
    timestamp: {
        type: Date,
        required: true,
        expires: '6h', // MongoDB will automatically delete documents after 6 hours
    }
});

// Prevents duplicate entries for the same loco at the exact same timestamp
locoPositionSchema.index({ loco_no: 1, timestamp: 1 }, { unique: true });

// Add an index on loco_no for faster searching
locoPositionSchema.index({ loco_no: 1 });

const LocoPosition = mongoose.model('LocoPosition', locoPositionSchema);

module.exports = LocoPosition;