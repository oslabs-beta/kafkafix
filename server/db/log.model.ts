import { model, Schema } from 'mongoose';

export interface ILog {
	timestamp: Date;
	level: string;
	namespace: string;
	message: string;
	error: string;
	clientId: string;
	broker: string;
}

const logSchema = new Schema<ILog>({
	timestamp: { type: Date, required: true },
	level: { type: String, required: true },
	namespace: { type: String, required: true },
	message: { type: String, required: true },
	error: { type: String, required: true },
	clientId: { type: String, required: true },
	broker: { type: String, required: true },
});

export const Log = model<ILog>('Log', logSchema);
