import express from 'express';
import User from '../models/User';
import {Request, Response} from 'express';

/*exports.getAllUsers = async (req, res) => { <- change to TypeScript syntax
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'An error occured while fetching users'});
    }
};*/

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    const isAdmin = true; // TODO: Implement admin check

    if (!isAdmin) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

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
    const isAdmin = true; // TODO: Implement admin check

    if (!isAdmin) {
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
};
