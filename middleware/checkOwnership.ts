import { Request, Response, NextFunction } from 'express';
import Book from '../models/Book';
import mongoose from 'mongoose';

interface AuthenticatedRequest extends Request {
  userId?: string;
  userRole: 'user' | 'admin';
}

export const checkOwnership = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ message: 'Invalid book ID' });
    return;
  }

  const book = await Book.findById(id);

  if (!book) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }

  if (book && req.userRole !== 'admin' && book.userId.toString() !== req.userId) {
    res.status(403).json({ message: 'Forbidden – Not your book' });
    return;
  }

  next();
};
