import express from 'express';
const { Request, Response } = express;
import Book from '../models/Book.ts';

interface PaginatedRequest extends Request {
    query: {
        page?: string;
        limit?: string;
    };
}

export const getAllBooks = async (req: PaginatedRequest, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page || '1'); // Default to 1 if not provided
        const limit = parseInt(req.query.limit || '10'); // Default to 10 if not provided

        const skip = (page - 1) * limit;

        const books = await Book.find().skip(skip).limit(limit);
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
        res.status(500).json({ error: 'An error occurred while fetching books' });
    }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return
        }
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({ message: "Book added successfully", book: newBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedBook) {
            res.status(404).json({ message: "Book not found" });
            return 
        }
        res.status(200).json({ message: "Book updated successfully", book: updatedBook });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
