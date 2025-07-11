import mongoose, { Schema, Document } from 'mongoose';
import { placeholderImage } from '../config/constants';

interface IBook extends Document {
    _id: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    title: string;
    author: string;
    cover: string;
    status: 'unread' | 'reading' | 'finished';
    dateAdded: Date;
}


const bookSchema: Schema<IBook> = new Schema<IBook>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
        description: 'must be an ObjectId and is required'
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        description: 'must be an ObjectId and is required',
    },
    title: {
        type: String,
        required: true,
        description: 'must be a string and is required',
    },
    author: {
        type: String,
        required: true,
        description: 'must be a string and is required',
    },
    cover: {
        type: String,
        required: true,
        default: placeholderImage,
        description: 'must be a string and is required',
    },
    status: {
        type: String,
        enum: ['unread', 'reading', 'finished'],
        required: true,
        description: 'must be a string and is required',
    },
    dateAdded: {
        type: Date,
        default: Date.now,
        required: true,
        description: 'must be a date and is required',
    },
});

const Book = mongoose.model<IBook>('Books', bookSchema);

export default Book;
