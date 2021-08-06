import { Application, Request, Response } from 'express';
import { RouteConfig } from '../common/route.config';
import { JMXController } from './jmx.controller';

export class JMXRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'JMXRoutes');
	}

	routes() {
		/**
		 * @GET     get Kafka metrics data
		 * @desc    get all metrics data
		 */
		this.app
			.route('/api/metrics')
			.get([JMXController.fetchMetrics], (req: Request, res: Response) => {
				return res.status(200);
			});

		return this.app;
	}
}
