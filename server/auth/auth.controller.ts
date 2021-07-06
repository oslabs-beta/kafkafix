import { RequestHandler } from 'express';

import { handleAsync } from '../common';
import { User } from '../db/user.model';

export class AuthController {
	// user provides email and pw
	// validate email & pw
	// check if user w/ email already exists
	// hash pw
	// save to db
	// send jwt
	/**
	 * @desc check if user exists in db
	 */
	static verifyUser: RequestHandler = async (req, res, next) => {
		const { email, password } = req.body;
		//return null if user not found
		const [user, error] = await handleAsync(User.findOne({ email }));

		if (error || !user) return next(error);
	};

	static signUp: RequestHandler = (req, res, next) => {};

	// user provides email / pw
	// get user w/ that email
	// compare hashed pw to provided pw
	// send jwt
	static login: RequestHandler = (req, res, next) => {};

	static delete: RequestHandler = (req, res, next) => {};
}
