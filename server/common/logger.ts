import { logLevel } from 'kafkajs';
import { format } from 'winston';
const winston = require('winston'); // WHY ES6 import does not wor
require('winston-mongodb').MongoDB;

type ILog = {
	timestamp: String;
	logger: String;
	message: String;
	broker: String;
	clientId: String;
	error: String;
	correlationId: Number;
	size: Number;
};

interface IProps {
	namespace: string;
	level: number;
	label: string;
	log: any; // CHECK type
}

const { createLogger, transports } = winston;
const { combine, json, timestamp, printf } = format;

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

const myFormat = printf(({ namespace, message, log }) => {
	const { broker, clientId, error } = log;
	return ` ${namespace} ${message} ${broker} ${clientId} ${error}`;
});

export const logCreator = (logLevel: any) => {
	const logger = createLogger({
		level: toWinstonLogLevel(logLevel),
		transports: [
			new transports.Console(),
			new transports.File({ filename: 'error.log' }),
			new transports.MongoDB({
				level: 'error',
				db: process.env.MONGO_URI,
				options: { useUnifiedTopology: true },
				collection: 'logs',
				format: combine(timestamp(), json(), myFormat),
			}),
		],
	});

	return ({ namespace, level, log }: IProps) => {
		const { message, broker, clientId, error } = log;
		logger.log({
			level: toWinstonLogLevel(level),
			namespace,
			message,
			error,
			clientId,
			broker,
		});
	};
};

// [1] logger:  {
// [1]   timestamp: '2021-07-08T05:36:17.661Z',
// [1]   logger: 'kafkajs',
// [1]   message: 'Response GroupCoordinator(key: 10, version: 2)',
// [1]   broker: '127.0.0.1:9092',
// [1]   clientId: 'kafkafix',
// [1]   error: 'The group coordinator is not available',
// [1]   correlationId: 0,
// [1]   size: 22
// [1] }
