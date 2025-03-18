const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

//endpoint get all books
router.get('/books', bookController.getAllBooks);

//endpoint get a book
router.get('/books/:id', bookController.getBookById);

//endpoint delete a book
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;