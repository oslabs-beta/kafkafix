import mongoose from 'mongoose';
import { RequestHandler } from 'express';

export class LogController {
	/**
	 * @desc    get all previous errors
	 */
	static getErrors: RequestHandler = async (req, res, next) => {};

	/**
	 * @desc    delete an error from db
	 */
	static deleteError: RequestHandler = async (req, res, next) => {};
}
