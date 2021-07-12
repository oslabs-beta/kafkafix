import { model, Document, Schema } from 'mongoose';

export interface ILog {
	timestamp: Date;
	level: string;
	message: string;
	meta: {
		namespace: string;
		error: {
			message: string;
			name: string;
			stack: string;
		};
		clientId: string | null;
		broker: string | null;
	};
}

export type LogDocument = ILog & Document;

const logSchema = new Schema<ILog>({
	timestamp: { type: Date, required: true },
	level: { type: String, required: true },
	message: { type: String, required: true },
	meta: {
		namespace: String,
		error: {
			message: String,
			name: String,
			stack: String,
		},
		clientId: String,
		broker: String,
	},
});

export const Log = model<ILog>('log', logSchema);
