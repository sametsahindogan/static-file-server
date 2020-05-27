const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    api_key: {
        type: String,
        required: true,
        minlength: 5,
    },
    api_secret: {
        type: String,
        required: true,
        minlength: 5,
    },
    created_at: {
        type: Date,
        default: Date.now
    }
}, {versionKey: false});

module.exports = mongoose.model('users', userSchema);