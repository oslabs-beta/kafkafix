import { Application, Request, Response } from 'express';
import { RouteConfig } from '../common/route.config';
import { LogController } from './log.controller';

export class LogRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'LogRoutes');
	}

	routes() {
		/**
		 * @GET     api/errors
		 * @desc    get all previous errors
		 */
		this.app
			.route('/api/errors')
			.get([LogController.getErrors], (req: Request, res: Response) => {
				return res.status(200).json(res.locals.errors);
			});

		/**
		 * @DELETE  api/errors
		 * @desc    delete an errror from db
		 */
		this.app
			.route('/api/errors')
			.delete([LogController.deleteError], (req: Request, res: Response) => {
				return res.sendStatus(200);
			});

		return this.app;
	}
}
