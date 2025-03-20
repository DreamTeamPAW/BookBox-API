import express, { Router } from 'express';
import { getAllUsers, deleteUser } from '../controllers/userController.ts';

const router: Router = express.Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of users
 *     description: Fetch all users with optional pagination. Only accessible by admins.
 *     tags: [Users]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: The page number to retrieve (default is 1)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: The number of users to retrieve per page (default is 10)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: A list of users with pagination information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of users
 *                     currentPage:
 *                       type: integer
 *                       description: The current page number
 *                     pageSize:
 *                       type: integer
 *                       description: The number of users per page
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages available
 *       403:
 *         description: Forbidden, if the user is not an admin
 *       500:
 *         description: Internal Server Error
 */
router.get('/users', getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user by their ID. Only accessible by admins.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden, if the user is not an admin
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/users/:id', deleteUser);

export default router;