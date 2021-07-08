import { Application } from 'express';
import { RouteConfig } from '../common/route.config';

export class JMXRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'JMXRoutes');
	}

	routes() {
		return this.app;
	}
}
