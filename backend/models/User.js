const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
        // Not required if signing up with Google
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true, // Allows multiple null values
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
