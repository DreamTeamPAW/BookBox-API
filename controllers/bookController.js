const Book = require('../models/Book');

exports.getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const books = await Book.find()
            .skip(skip)
            .limit(limit);
        
        const totalBooks = await Book.countDocuments();

        const totalPages = Math.ceil(totalBooks / limit);

        res.json({
            books,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalBooks: totalBooks,
                limit: limit
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'An error occured while fetching books'});
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({message: "Book not found"});
        }
        res.json(book);
    } catch (error){
        res.status(500).json({ message: error.message});
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({message: "Book not found"});
        }
        res.json({message: "Book deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};