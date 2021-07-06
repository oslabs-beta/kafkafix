import { logLevel } from 'kafkajs';
import { format } from 'winston';
const winston = require('winston'); // WHY ES6 import does not wor
require('winston-mongodb').MongoDB;

interface IProps {
	namespace: any;
	level: any;
	label: any;
	log: any;
}

const { createLogger, transports } = winston;
const { combine, json, timestamp } = format;

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
			new transports.File({ filename: 'error.log' }),
			new transports.MongoDB({
				level: 'error',
				db: process.env.MONGO_URI,
				options: { useUnifiedTopology: true },
				collection: 'logs',
				format: combine(timestamp(), json()),
			}),
		],
	});

	return ({ namespace, level, label, log }: IProps) => {
		console.log('logger types: namespace', typeof namespace);
		console.log('logger types: level', typeof level);
		console.log('logger types: label', typeof label);
		console.log('logger types: lgo', typeof log);

		console.log('from logger: namespace', namespace);
		console.log('from logger: label', label);

		const { message, ...extra } = log;
		logger.log({
			level: toWinstonLogLevel(level),
			message,
			extra,
		});
	};
};
