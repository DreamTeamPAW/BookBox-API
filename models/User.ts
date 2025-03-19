import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    passwordHash: string;
    email: string;
    validTokens: string[];
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true,
    },
    passwordHash: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    validTokens: {
        type: [String],
        default: [],
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
