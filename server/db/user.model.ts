import { model, Schema, Document } from 'mongoose';
import { type } from 'os';

export interface IUser {
    email: String,
    password: String,
    fullName: String,
    cookie: String
}

export type UserDocument = IUser & Document;

const userSchema = new Schema<IUser>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    cookie: { type: String, required: true }
});
    


export const User = model<IUser>('User', userSchema);
