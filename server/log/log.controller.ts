import { RequestHandler } from 'express';
import fs from 'fs';
import { format } from 'winston';
const winston = require('winston');
require('winston-mongodb').MongoDB;
import WebSocket, { Server } from 'ws';
const url = require('url');
import { handleAsync } from '../common';
import { Log } from '../db/log.model';
import { server } from '../index';

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
	log: any; // CHECK type
}

const { createLogger, transports } = winston;
const { combine, json, metadata, timestamp } = format;

export class LogController {
	static logCreator = () => {
		const wss = new Server({ server });
		wss.on('connection', () => console.log('ws: logger'));

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

		// server.on('upgrade', (request, socket, head) => {
		// 	const pathname = url.parse(request.url).pathname;

		// 	console.log('LOGGER: upgrade');

		// 	if (pathname === '/api/notification') {
		// 		wss.handleUpgrade(request, socket, head, ws => {
		// 			wss.emit('connection', ws, request);

		// 			logger.on('data', (transports: any) => {
		// 				const { level, message, metadata } = transports;

		// 				ws.send({ level, message, metadata });
		// 				console.log('LOGGER: AFTER SEND');
		// 			});
		// 		});
		// 	} else {
		// 		socket.destroy();
		// 	}
		// });

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
	// CHECK after packaging, does the file save to right place?
	static getErrors: RequestHandler = (req, res, next) => {
		const path = './error.log';

		try {
			if (fs.existsSync(path)) {
				const data = fs.readFileSync('./error.log').toString().split('\r\n');
				const errors: IErrors[] = [];

				data.forEach(error => {
					if (error.length > 1) errors.push(JSON.parse(error));
				});

				res.locals.errors = errors; //!
			}

			return next();
		} catch (e) {
			console.error(e);
			return next(e);
		}
	};

	/**
	 * @desc    get all previous errors from db
	 * @returns
	 */
	static fetchErrors: RequestHandler = async (req, res, next) => {
		const [errors, error] = await handleAsync(Log.find({}));

		if (error) return next(error);
		res.locals.errors = errors;

		return next();
	};

	/**
	 * @desc    delete an error from db
	 */
	static deleteError: RequestHandler = async (req, res, next) => {
		const { id } = req.body;
		const [, error] = await handleAsync(Log.deleteOne({ _id: id }));

		if (error) return next(error);

		return next();
	};
}
