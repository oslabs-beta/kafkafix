import { RequestHandler } from 'express';
import fs from 'fs';

import { handleAsync } from '../common';
import { Log } from '../db/log.model';

export class LogController {
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
				//! no need to parse it, just send the data
				const errors = data.map(error => {
					if (error.length > 1) return JSON.parse(error);
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
