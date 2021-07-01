import { RequestHandler } from 'express';

import handleAsync from '../common/handleAsync';
import { User } from './user.model';

export class AuthController {
	static verifyUser: RequestHandler = async (req, res, next) => {
		const { email, password } = req.body;
		//return null if user not found
		const [user, error] = await handleAsync(User.findOne({ email }));

		if (error || !user) return next(error);
	};

	static signUp: RequestHandler = (req, res, next) => {};

	static login: RequestHandler = (req, res, next) => {};
}
