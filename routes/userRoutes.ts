import express, { Router } from 'express';
import { getAllUsers, deleteUser } from '../controllers/userController.ts';

const router: Router = express.Router();


router.get('/users', getAllUsers);

router.delete('/users/:id', deleteUser);

export default router;