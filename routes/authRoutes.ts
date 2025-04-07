import express, { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

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
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid details or user already exists
 *       500:
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
 *       200:
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
 *       400:
 *         description: Invalid details, user not found, or wrong password
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', loginUser);

export default router;