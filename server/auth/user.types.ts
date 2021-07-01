import { Document } from 'mongoose';

export interface IUser {
	email: string;
	password: string;
}

export type UserDocument = IUser & Document;
