// import { Router } from 'express';
import { RouteConfig } from '../common/route.config';
import { Application, Request, Response } from 'express';

import { AdminController } from './admin.controller';

export class KafkaRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'KafkaRoutes');
	}

	routes() {
		this.app.route('/api/connect').post([
			AdminController.kafka,
			(req: Request, res: Response) => {
				return res.status(200).json({ post: 'success' });
			},
		]);

		return this.app;
	}
}
