import { RequestHandler } from 'express';
import { handleAsync } from '../common';
import { Log } from '../db/log.model';

export class LogController {
	/**
	 * @desc    get all previous errors
	 */
	static getErrors: RequestHandler = async (req, res, next) => {
		const [errors, error] = await handleAsync(Log.find({}));

		if (error) return next(error);
		res.locals.errors = errors; // CHECK how data looks like

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
