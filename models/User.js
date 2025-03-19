const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        description: 'must be a string and is required'
    },

    passwordHash: {
        type: String,
        required: true,
        description: 'must be a string and is required'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        description: 'must be a string and is required'
    },
    email: {
        type: String,
        required: true,
        description: 'must be a string and is required'
    },
    validTokens: {
        type: [String],
        default: [],
        description: 'must be an array of strings and is not required'
    },
});

const User = mongoose.model('Users', userSchema);
module.exports = User;