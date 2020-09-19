
const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        min: 3
    },
    email: {
        required: true,
        type: String,
        min: 6,
        unique: true
    },
    password: {
        required: true,
        type: String,
        min: 6,
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('user',User);