import { model, Schema, Document, Model } from 'mongoose';
import  mongoose from 'mongoose';

export interface ILog {
	timestamp: Date;
	levels: string;
	message: string;
	meta: string | null;
}

// export interface ILogDocument extends ILog, Document {}
// export interface LogModel extends Model<ILogDocument> {}

// export type LogDocument = ILog & Document; //!

const logSchema = new Schema<ILog>({
	timestamp: { type: Date, required: true },
	level: { type: String, required: true },
	message: { type: String, required: true },
	meta: { type: null }, //!
});

// export const Log = model<ILogDocument>('log', logSchema);
export const Log = mongoose.model<ILog>('Log', logSchema);
