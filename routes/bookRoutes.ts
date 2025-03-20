import express, { Router } from 'express';
import { getAllBooks, getBookById, deleteBook, addBook, updateBook } from '../controllers/bookController.ts';

const router: Router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     description: Fetch all books with optional pagination
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalBooks:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */
router.get('/books', getAllBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     description: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */
router.get('/books/:id', getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     description: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/books/:id', deleteBook);

/**
 * @swagger
 * /api/books:
 *   post:
 *     description: Add a new book to the library
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user who owns the book
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of tags associated with the book
 *               status:
 *                 type: string
 *                 enum: [unread, reading, finished]
 *                 description: The current reading status of the book
 *               dateAdded:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the book was added
 *     responses:
 *       201:
 *         description: Book added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Book added successfully"
 *                 book:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad Request - Invalid input
 *       500:
 *         description: Internal Server Error
 */
router.post('/books', addBook);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     description: Update an existing book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book to be updated
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user who owns the book
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of tags associated with the book
 *               status:
 *                 type: string
 *                 enum: [unread, reading, finished]
 *                 description: The current reading status of the book
 *               dateAdded:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the book was added
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad Request - Invalid input
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal Server Error
 */
router.put('/books/:id', updateBook);

export default router;
