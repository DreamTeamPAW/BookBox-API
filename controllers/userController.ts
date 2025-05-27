import express from 'express';
import User from '../models/User';
import {Request, Response} from 'express';
import Book from '../models/Book';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {

    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const users = await User.find({})
            .skip(offset)
            .limit(limit)
            .exec();

        const total = await User.countDocuments();

        res.status(200).json({
            users,
            pagination: {
                total,
                currentPage: page,
                pageSize: limit,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) { 
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        await Book.deleteMany({ userId: id });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
};
