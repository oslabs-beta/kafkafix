import { RequestHandler } from 'express';
import { handleAsync } from '../common';
const bcrypt = require("bcrypt");
import { User, UserDocument } from '../db/user.model';

export class AuthController {
	static signup: RequestHandler = async (req, res, next) => {
		const { email, password, fullName } = req.body;
		try {
			const result = await handleAsync(User.find({ email }));
			if (result.length) return next({ err: "email has already been used" });
		} catch (e) {
			return next({ err: "error with searching db for email: " + e });
		}
		const hashedPassword = await bcrypt.hash(password, 5);
		const cookie = await bcrypt.hash(fullName, 5);
		try {
			await handleAsync(User.create({
			  email,
			  password: hashedPassword,
			  fullName,
			  cookie
			}));
		} catch (e) {
			return next({ err: "error with inserting into user collection: " + e });
		}
		res.cookie("SSID", cookie);
		return next();
	};

	static login: RequestHandler = async (req, res, next) => {
		const { email, password } = req.body;
		try {
			const [user] = await handleAsync(User.find({ email }));
			if (user === undefined) return next({ err: "invalid email/password" });
			const { password: hashedPassword, cookie } = user as UserDocument;
			const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      res.cookie("SSID", cookie);
      res.locals.doc = user;
      return next();
    }
    return next({ err: "invalid email/password" });
		}
		catch (e) {
			return next({ err: "error with searching for user pass in db: " + e });
		  }
	};

	static logout: RequestHandler = async (req, res, next) => {
		try {
			res.clearCookie("ssid");
			return next();
		  } catch (e) {
    		next({
      			log: "ERROR from AuthController.logout",
      			message: { err: `Did not delete cookie properly ERROR: ${e}` },
   			 });
  			}
	};
}
