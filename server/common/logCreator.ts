import { logLevel } from 'kafkajs';
import { format } from 'winston';
const winston = require('winston');
require('winston-mongodb').MongoDB; //! check

interface IProps {
	namespace: string;
	level: any; //! why not string
	log: any; // CHECK type
}

const { createLogger, transports } = winston;
const { combine, json, metadata, timestamp } = format;

// CHECK types
const toWinstonLogLevel = (level: any) => {
	switch (level) {
		case logLevel.ERROR:
		case logLevel.NOTHING:
			return 'error';
		case logLevel.WARN:
			return 'warn';
		case logLevel.INFO:
			return 'info';
		case logLevel.DEBUG:
			return 'debug';
	}
};

// CHECK types
export const logCreator = (logLevel: any) => {
	const logger = createLogger({
		level: toWinstonLogLevel(logLevel),
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

	return ({ namespace, level, log }: IProps) => {
		const { message, broker, clientId, error, groupId } = log;
		logger.log({
			level: toWinstonLogLevel(level),
			namespace,
			message,
			error,
			clientId,
			broker,
			groupId,
		});
	};
};
