import { Schema, model, models } from 'mongoose';
import { IUser } from './interfaces/IUser';

const UserSchema = new Schema({
    _id: {
        type: String,
        auto: true,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    image: {
        type: String,
    }
}, { timestamps: true });


export const User = models?.User || model<IUser>('User', UserSchema);
