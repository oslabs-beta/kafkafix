import { connect } from 'mongoose';
import dotenv from 'dotenv';
import { handleAsync } from './';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI!;

export class Mongoose {
	private options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		dbName: 'kafkafix',
	};

	constructor() {
		this.connect();
	}

	async connect(): Promise<void> {
		const [db, error] = await handleAsync(connect(MONGO_URI, this.options));

		if (db) return console.log('Connected to DB');
		if (error) return console.error(`Failed to connect to DB: ${error}`);
	}
}
