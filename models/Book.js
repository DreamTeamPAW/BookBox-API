const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        description: 'must be an integer and is required',
    },
    isbn: {
        type: String,
        required: true,
        description: 'must be a string and is required',
    },
    title: {
        type: String,
        required: true,
        description: 'must be a string and is required',
    },
    author: {
        type: String,
        required: true,
        description: 'must be a string and is required',
    },
    tags: {
        type: [String],
        required: true,
        description: 'must be an array of strings and is required',
    },
    status: {
        type: String,
        enum: ['unread', 'reading', 'finished'],
        required: true,
        description: 'must be a string and is required'
    },
    dateAdded: {
        type: Date,
        default: Date.now,
        required: true,
        description: 'must be a date and is required'
    }
});

const Book = mongoose.model('Books', bookSchema);
module.exports = Book;