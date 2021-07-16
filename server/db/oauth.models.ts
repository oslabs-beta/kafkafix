import { model, Schema, Document } from 'mongoose';
import { type } from 'os';

export interface IOAuth {
	email: String;
	password: String;
}

export type OAuthDocument = IOAuth & Document;

const oauthSchema = new Schema<IOAuth>({
	email: { type: String, required: true },
	password: { type: String, required: true },
});

export const OAuth = model<IOAuth>('OAuth', oauthSchema);