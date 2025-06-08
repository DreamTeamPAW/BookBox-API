import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

export const validateBookInputs = (req: Request, res: Response, next: NextFunction): void => {
  const { title, author, status, cover } = req.body;

  if (!title || !author || !status) {
    res.status(400).json({ message: "Title, author and status are required" });
    return;
  }

  if (!validator.isLength(title, { min: 2, max: 30 })) {
    res.status(400).json({ message: "Title must be between 2 and 30 characters" });
    return;
  }

  if (!validator.isLength(author, { min: 2, max: 30 })) {
    res.status(400).json({ message: "Author must be between 2 and 30 characters" });
    return;
  }

  const allowedStatus = ['unread', 'reading', 'finished'];
  if (!allowedStatus.includes(status)) {
    res.status(400).json({ message: "Status must be one of: unread, reading, finished" });
    return;
  }

  if (!cover || typeof cover !== 'string' || !cover.startsWith('data:image/')) {
    res.status(400).json({
      message: "Cover must be a base64-encoded image string starting with 'data:image/'"
    });
    return;
  }


  next();
};
