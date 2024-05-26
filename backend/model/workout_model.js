const mongoose = require('mongoose');

// Schema

const workoutSchema = new mongoose.Schema({
    'title': {
        type: String,
        required: true
    },
    'description': {
        type: String,
        required: true
    },
    'reps': {
        type: Number,
        required: true
    },
    'load': {
        type: Number,
        required: true
    },
    'user_id': {
        type: String,
        required: true
    }
}, { timestamps: true }); //timestamps: true adds createdAt and updatedAt fields to the schema automatically

// Model
module.exports = mongoose.model('Workout', workoutSchema);

