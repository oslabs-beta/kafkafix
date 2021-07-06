import { logLevel } from 'kafkajs';
import { format } from 'winston';
const winston = require('winston'); // WHY ES6 import does not wor
require('winston-mongodb').MongoDB;

interface IProps {
	namespace: string;
	level: number;
	label: string;
	log: any; //! object
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

const myFormat = printf(({ namespace, message }) => {
	return `${namespace} ${message}`;
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

	return ({ namespace, level, label, log }: IProps) => {
		console.log('logger: ', log);
		console.log('label: ', label);

		const { message, ...extra } = log;
		logger.log({
			level: toWinstonLogLevel(level),
			namespace,
			message,
			extra,
		});
	};
};
