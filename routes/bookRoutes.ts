import express, { Router } from 'express';
import { getAllBooks, getBookById, deleteBook, addBook, updateBook } from '../controllers/bookController.ts';

const router: Router = express.Router();

// Endpoint to get all books
router.get('/books', getAllBooks);

// Endpoint to get a book by ID
router.get('/books/:id', getBookById);

// Endpoint to delete a book by ID
router.delete('/books/:id', deleteBook);

// Endpoint to add a new book
router.post('/books', addBook);

// Endpoint to update a book by ID
router.put('/books/:id', updateBook);

export default router;
