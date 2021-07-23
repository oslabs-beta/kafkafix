import { format } from 'winston';
const winston = require('winston');

interface IProps {
	namespace: string;
	log: any; 
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
		],
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
