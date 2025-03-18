const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const book = await Book.find();
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'An error occured while fetching books'});
    }
};