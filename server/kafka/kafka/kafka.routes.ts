import { Application, Request, Response } from 'express';

import { RouteConfig } from '../../common/route.config';
import { KafkaController } from './kafka.controller';
import { TopicController } from '../topic/topic.controller';
import ProducerController from './producer.controller';
import { ConsumerController } from './consumer.controller';
import { GroupController } from '../group/group.controller';

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
			.route('/api/composeup')
			.post([KafkaController.composeUp], (req: Request, res: Response) => {
				return res.status(200);
			});

		/**
		 * @POST     Stop containers
		 * @desc     Stop Docker containers from docker-compose file
		 */
		this.app
			.route('/api/composedown')
			.post([KafkaController.composeDown], (req: Request, res: Response) => {
				return res.status(200);
			});

		/**
		 * @POST     Initialize producer
		 * @desc     Initialize an instance of producer for all topics
		 */
		this.app
			.route('/api/producer')
			.get(
				[TopicController.listTopics, ProducerController.producer],
				(req: Request, res: Response) => {
					return res.status(200);
				}
			);

		/**
		 * @POST     Initialize consumer
		 * @desc     Initialize an instance of consumer and send list of consumer groups
		 */
		this.app
			.route('/api/consumer')
			.post(
				[ConsumerController.consumer, GroupController.listGroups],
				(req: Request, res: Response) => {
					return res.status(200);
				}
			);

		/**
		 * @POST     Initialize kafka
		 * @desc    sends cluster info and all metadata
		 */
		this.app.route('/api/connect').post([
			KafkaController.kafka,
			KafkaController.admin,
			KafkaController.describeCluster,
			TopicController.getAllTopicMetadata,
			GroupController.listGroups,
			(req: Request, res: Response) => {
				const { cluster, metadata, groups } = res.locals;
				return res.status(200).json({ cluster, metadata, groups });
			},
		]);

		return this.app;
	}
}
