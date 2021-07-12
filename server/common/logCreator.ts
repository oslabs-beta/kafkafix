import { logLevel } from 'kafkajs';
import { format } from 'winston';
// import winston from 'winston'; // WHY types
const winston = require('winston');
require('winston-mongodb').MongoDB; //! check

interface IProps {
	namespace: string;
	level: any; //! why not string
	log: any; // CHECK type
}

const { createLogger, transports } = winston;
const { combine, json, metadata } = format;

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

export const logCreator = (logLevel: any) => {
	const logger = createLogger({
		level: toWinstonLogLevel(logLevel),
		transports: [
			new transports.Console(),
			// new transports.File({ filename: 'error.log' }),
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
