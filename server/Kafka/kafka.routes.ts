import { Application, Request, Response } from 'express';

import { AdminController } from './admin.controller';
import { RouteConfig } from '../common/route.config';

export class KafkaRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'KafkaRoutes');
	}

	// try chaining http methods
	routes() {
		this.app.route('/api/connect').post([
			AdminController.kafka,
			(req: Request, res: Response) => {
				const { metadata, clusterInfo } = res.locals;
				return res.status(200).json({ metadata, clusterInfo });
			},
		]);

		return this.app;
	}
}
