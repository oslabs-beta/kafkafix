import { RequestHandler } from 'express';
import fs from 'fs';
import * as WebSocket from 'ws';

import { handleAsync } from '../common';
import { Log } from '../db/log.model';

interface IErrors {
	level: string;
	namespace: string;
	message: string;
	error: string;
	cliendId: string;
	broker: string;
	timestamp: string;
}

export class LogController {
	/**
	 * @desc    get all previous errors from error.log
	 * @returns {Array{}}
	 */
	// CHECK after packaging, does the file save to right place?
	static getErrors: RequestHandler = (req, res, next) => {
		const path = './error.log';
		// const server = req.app.locals.server;
		const wss = new WebSocket.Server({ noServer: true });

		wss.on('connection', ws => {
			console.log('ws: getErrors');
		});

		try {
			if (fs.existsSync(path)) {
				const data = fs.readFileSync('./error.log').toString().split('\r\n');
				const errors: IErrors[] = [];

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
