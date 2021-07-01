import { Application, Request, Response } from 'express';
import { RouteConfig } from '../common/route.config';

export class AuthRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'AuthRoutes');
	}

	routes() {
		this.app.route('/signup').post([], (req: Request, res: Response) => {
			res.status(200).send('signup');
		});

		this.app.route('/login').get([], (req: Request, res: Response) => {
			res.status(200).send('login');
		});

		return this.app;
	}
}
