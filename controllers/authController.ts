import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Request, Response } from "express";

interface UserRegistrationRequest extends Request {
    body: {
        email: string;
        username: string;
        password: string;
    }
}

export const registerUser = async (req: UserRegistrationRequest, res: Response): Promise<void> => {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
        res.status(400).send("Invalid details");
        return;
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ username: username, email: email, passwordHash: passwordHash, role: 'user' });
        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send("Invalid details");
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ error: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({ error: "Wrong password" });
            return;
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
};
