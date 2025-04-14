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
        res.status(400).json({ message: "Invalid details" });
        return;
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({ username: username, email: email, passwordHash: passwordHash, role: 'user' });
        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Invalid details" });
        return;
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch) {
            res.status(400).json({ message: "Wrong password" });
            return;
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Internal server error" });
    }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.status(401).json({ error: "Not token provided" });
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: "Wrong token format. Should be 'Bearer: token_string'" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        const userID = decoded.id;
        const user = await User.findById(userID).select("-passwordHash -__v");
        res.json({ user: user });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: "Invalid token" });
    }
};
