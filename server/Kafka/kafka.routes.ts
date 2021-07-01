// import { Router } from 'express';
import { RouteConfig } from '../common/route.config';
import { Application, Request, Response } from 'express';

import { AdminController } from './admin.controller';

// const router = Router();

// router.post(
// 	'/',
// 	AdminController.kafka,
// 	AdminController.getTopics,
// 	(req, res) => {
// 		return res.status(200).json(res.locals.topics);
// 	}
// );

// export default router;

export class KafkaRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'KafkaRoutes');
	}

	routes() {
		this.app
			.route('/')
			.get([
				AdminController.kafka,
				AdminController.getTopics,
        (req: Request, res: Response) => {
          
        },
			]);

		return this.app;
	}
}
