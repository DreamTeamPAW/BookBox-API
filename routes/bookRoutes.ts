import express, { Router } from 'express';
import { getAllBooks, getBookById, deleteBook, addBook, updateBook } from '../controllers/bookController';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     description: Fetch all books with optional pagination
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
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
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Optional search string to filter books by title or author
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Optional filter books by user ID
 *     responses:
 *       '200':
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
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         description: Internal Server Error
 */
router.get('/books', authenticateToken, getAllBooks);


/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     description: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Book found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal Server Error
 */
router.get('/books/:id', authenticateToken, getBookById);


/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     description: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the book
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/books/:id', authenticateToken, deleteBook);


/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     description: Add a new book to the library
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
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
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               cover:
 *                 type: string
 *                 description: The cover of the book
 *               status:
 *                 type: string
 *                 enum: [unread, reading, finished]
 *                 description: The current reading status of the book
 *               dateAdded:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the book was added
 *     responses:
 *       '201':
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
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '400':
 *         description: Bad Request - Invalid input
 *       '500':
 *         description: Internal Server Error
 */
router.post('/books', authenticateToken, addBook);


/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     description: Update an existing book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
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
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               cover:
 *                 type: string
 *                 description: The cover of the book
 *               status:
 *                 type: string
 *                 enum: [unread, reading, finished]
 *                 description: The current reading status of the book
 *               dateAdded:
 *                 type: string
 *                 format: date-time
 *                 description: The date when the book was added
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       '400':
 *         description: Bad Request - Invalid input
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal Server Error
 */
router.put('/books/:id', authenticateToken, updateBook);


export default router;
