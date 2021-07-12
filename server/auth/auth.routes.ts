import { Application, Request, Response } from 'express';
import { RouteConfig } from '../common/route.config';
import { AuthController } from './auth.controller';
export class AuthRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'AuthRoutes');
	}

	routes() {
    /**
     * @POST    api/signup
     * @desc    sign up user 
     */
		this.app.route('/api/signup').post([AuthController.signup], (req: Request, res: Response) => {
			res.status(200).send('signup');
		});

    /**
     * @POST    api/login
     * @desc    login user
     */
		this.app.route('/api/login').get([AuthController.login], (req: Request, res: Response) => {
			res.status(200).send('login');
		});

		this.app.post('/api/logout', AuthController.logout, (req, res) => {
			res.status(200).json('success');  
			});
			

		return this.app;
	}
}
