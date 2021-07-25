import { RequestHandler } from 'express';
import fs from 'fs';
const winston = require('winston');

interface IErrors {
	level: string;
	namespace: string;
	message: string;
	error: string;
	cliendId: string;
	broker: string;
	timestamp: string;
}

interface IProps {
	namespace: string;
	log: any;
}

const { createLogger, transports } = winston;
const { combine, json, metadata, timestamp } = winston.format;

export class LogController {
	static logCreator = () => {
		const logger = createLogger({
			level: 'info',
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

		return ({ namespace, log }: IProps) => {
			const { message, broker, clientId, error, groupId } = log;

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

	/**
	 * @desc    get all previous errors from error.log
	 * @returns {Array{}}
	 */
	static getErrors: RequestHandler = (req, res, next) => {
		const path = './error.log';

		try {
			if (fs.existsSync(path)) {
				const darwin = process.platform === 'darwin';
				let data: string | string[] = fs.readFileSync('./error.log').toString();
				const errors: IErrors[] = [];

				if (darwin) data = data.split('\n');
				else data = data.split('\r\n');

				data.forEach(error => {
					if (error.length > 1) errors.push(JSON.parse(error));
				});

				res.locals.errors = errors;
			}

			return next();
		} catch (e) {
			console.error(e);
			return next(e);
		}
	};
}
