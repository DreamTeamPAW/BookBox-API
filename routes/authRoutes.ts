import express, { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router: Router = express.Router();


/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - username
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               username:
 *                 type: string
 *                 example: username
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     description: Register a new user with email, username, and password. The password will be hashed before saving to the database.
 *     responses:
 *       '200':
 *         description: User registered successfully
 *       '400':
 *         description: Invalid details or user already exists
 *       '500':
 *         description: Internal Server Error
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     description: Log in a user with email and password. If successful, a JWT token will be returned.
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JSON Web Token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       '400':
 *         description: Invalid details, user not found, or wrong password
 *       '500':
 *         description: Internal Server Error
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /api/me:
 *   get:
 *     summary: Get user information
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     description: Get the information of the currently logged-in user.
 *     responses:
 *       '200':
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   description: User object without password and __v field
 *                   properties:
 *                    _id:
 *                      type: string
 *                      description: The ID of the user
 *                      example: 60d5f484f1c2b8a3d4e4b8c0
 *                    username:
 *                      type: string
 *                      description: The username of the user
 *                      example: username
 *                    email:
 *                      type: string
 *                      description: The email of the user
 *                      example: useremail@email.com
 *                    role:
 *                      type: string
 *                      description: The role of the user
 *                      example: user
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '500':
 *         description: Internal Server Error
 */
router.get('/me', authenticateToken, getMe);


export default router;
