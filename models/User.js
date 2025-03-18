const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    validTokens: {
        type: [String],
        default: [],
    }
});

const User = mongoose.model('Users', userSchema);
module.exports = User;