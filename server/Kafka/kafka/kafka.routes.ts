import { Application, Request, Response } from 'express';

import { RouteConfig } from '../../common/route.config';
import { KafkaController } from './kafka.controller';
import { TopicController } from '../topic/topic.controller';
import { Docker } from './docker.controller';

export class KafkaRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'KafkaRoutes');
	}

	routes() {
		/**
		 * @POST     Initialize kafka
		 * @desc    sends cluster info and all metadata
		 */
		this.app.route('/api/connect').post([
			// Docker.docker,
			KafkaController.kafka,
			KafkaController.admin,
			KafkaController.describeCluster,
			TopicController.getAllTopicMetadata,
			(req: Request, res: Response) => {
				const { cluster, metadata } = res.locals;
				return res.status(200).json({ cluster, metadata });
			},
		]);

		return this.app;
	}
}
