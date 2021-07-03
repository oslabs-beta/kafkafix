import { Application, Request, Response } from 'express';

import { RouteConfig } from '../../common/route.config';

export class GroupRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'GroupRoutes');
	}
	routes() {
		this.app.route('/api/test').get([], (req: Request, res: Response) => {
			return res.status(200).json({ hi: 'hi' });
		});

		return this.app;
	}
}
