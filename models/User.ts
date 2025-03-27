import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    username: string;
    passwordHash: string;
    email: string;
    role: 'user' | 'admin';
}

const userSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
        description: 'must be an ObjectId and is required'
    },
    username: {
        type: String,
        required: true,
        description: 'must be a string and is required'
    },
    passwordHash: {
        type: String,
        required: true,
        description: 'must be a string and is required'
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        description: 'must be a string and is required'
    },
    email: {
        type: String,
        required: true,
        description: 'must be a string and is required'
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
