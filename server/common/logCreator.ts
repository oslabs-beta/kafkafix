import { format } from 'winston';
const winston = require('winston');
require('winston-mongodb').MongoDB;

interface IProps {
	namespace: string;
	log: any; // CHECK type
}

const { createLogger, transports } = winston;
const { combine, json, metadata, timestamp } = format;

export const logCreator = () => {
	const logger = createLogger({
		level: 'error',
		format: combine(
			timestamp({ format: 'YYY-MM-DD hh:mm:ss' }),
			json(),
			metadata()
		),
		transports: [
			new transports.Console(),
			new transports.File({ filename: 'error.log' }),
			new transports.MongoDB({
				level: 'error',
				db: process.env.MONGO_URI,
				options: { useUnifiedTopology: true },
				collection: 'logs',
				format: combine(json(), metadata()),
			}),
		],
	});

	logger.on('data', (transports: any) => {
		const { level, message, metadata } = transports;

		// ws.send({ level, message, metadata });
	});

	return ({
		namespace,
		log: { message, broker, clientId, error, groupId },
	}: IProps) => {
		logger.log({
			level: 'error',
			namespace,
			message,
			error,
			clientId,
			broker,
			groupId,
		});
	};
};
