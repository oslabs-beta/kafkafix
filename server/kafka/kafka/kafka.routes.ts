import { Application, Request, Response } from 'express';

import { RouteConfig } from '../../common/route.config';
import { KafkaController } from './kafka.controller';
import { TopicController } from '../topic/topic.controller';
import ProducerController from './producer.controller';
import { ConsumerController } from './consumer.controller';
import { GroupController } from '../group/group.controller';
import { JMXController } from '../../jmx/jmx.controller';

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
			.route('/api/disconnect')
			.delete([KafkaController.composeDown], (req: Request, res: Response) => {
				return res.status(200);
			});

		/**
		 * @POST     Initialize Kafka
		 * @desc    sends cluster info and all metadata
		 */
		this.app.route('/api/connect').post([
			KafkaController.kafka,
			KafkaController.startAdmin,
			KafkaController.describeCluster,
			TopicController.getAllTopicMetadata,
			GroupController.listGroups,
			JMXController.fetchMetrics,
			(req: Request, res: Response) => {
				const { cluster, metadata, groups } = res.locals;
				return res.status(200).json({ cluster, metadata, groups });
			},
		]);

		/**
		 * @PUT     Disconnects Kafka
		 * @desc    disconnects admin kafka instance
		 */
		this.app.route('/api/connect').put([
			KafkaController.disconnectAdmin,
			(req: Request, res: Response) => {
				console.log('disconnect admin');
				return res.status(200);
			},
		]);

		/**
		 * @POST     Initialize producer
		 * @desc     Initialize an instance of producer
		 */

		this.app
			.route('/api/producer')
			.post(
				[ProducerController.startProducer],
				(req: Request, res: Response) => {
					return res.status(200);
				}
			);

		/**
		 * @PUT      Stops producer
		 * @desc     Stops given producer by topic
		 */
		this.app
			.route('/api/producer')
			.put([ProducerController.stopProducer], (req: Request, res: Response) => {
				console.log('disconnect producer');
				return res.status(200);
			});

		/**
		 * @POST     Initialize consumer
		 * @desc     Initialize an instance of consumer
		 */
		this.app
			.route('/api/consumer')
			.post(
				[ConsumerController.startConsumer],
				(req: Request, res: Response) => {
					return res.status(200);
				}
			);

		/**
		 * @PUT      Stops consumer
		 * @desc     Stops given consumer by topic and groupId
		 */
		this.app
			.route('/api/consumer')
			.put([ConsumerController.stopConsumer], (req: Request, res: Response) => {
				console.log('disconnect consumer');
				return res.status(200);
			});

		return this.app;
	}
}
