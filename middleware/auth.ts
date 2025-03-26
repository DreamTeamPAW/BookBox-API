import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token provided" });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
        req.user = verified.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default authenticateToken;