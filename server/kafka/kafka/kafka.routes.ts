import { Application, Request, Response } from 'express';

import { RouteConfig } from '../../common/route.config';
import { KafkaController } from './kafka.controller';
import { TopicController } from '../topic/topic.controller';
import { Docker } from './docker.controller';
import { KafkaMetricsController } from '../../jmx/kafka.metrics.controller';
import { JVMMetricsController } from '../../jmx/jvm.metrics.controller';
import { LogController } from '../../log/log.controller';
import { ProducerController } from './producer.controller';
import { ConsumerController } from './consumer.controller';

export class KafkaRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'KafkaRoutes');
	}

	routes() {
		/**
		 * @POST     Initialize containers
		 * @desc     Initialize Docker containers from docker-compose file
		 */
		this.app
			.route('/api/dockerfile')
			.post([Docker.docker], (req: Request, res: Response) => {
				return res.status(200);
			});

		/**
		 * @POST     Initialize producer
		 * @desc     Initialize an instance of producer
		 */
		this.app.route('/api/producer').get([ProducerController.producer], (req: Request, res: Response) => {
			return res.status(200);
		});

		/**
		 * @POST     Initialize consumer
		 * @desc     Initialize an instance of consumer
		 */
		this.app.route('/api/consumer').get([ConsumerController.consumer], (req: Request, res: Response) => {
			return res.status(200);
		});

		/**
		 * @POST     Initialize kafka
		 * @desc    sends cluster info and all metadata
		 */
		this.app.route('/api/connect').post([
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
