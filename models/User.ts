import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    passwordHash: string;
    email: string;
    role: string;
}

const userSchema: Schema = new Schema({
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
