import { RequestHandler } from 'express';

import handleAsync from '../common/handleAsync';
import { User } from './user.model';

export class AuthController {
	static verifyUser: RequestHandler = async (req, res, next) => {
		const { email, password } = req.body;
		const [user, error] = await handleAsync(User.find({ email }));
	};

	static signUp: RequestHandler = (req, res, next) => {};

	static login: RequestHandler = (req, res, next) => {};
}
