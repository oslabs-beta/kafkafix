import { Application, Request, Response } from 'express';

import { RouteConfig } from '../../common/route.config';
// import { TopicController } from './topic.controller';
import { TopicController } from './topic.controller';

export class TopicRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'TopicRoutes');
	}

	routes() {
		/**
		 * @GET     api/topic
		 * @desc    get list of topics
		 */
		this.app
			.route('/api/topic')
			.get([TopicController.listTopics], (req: Request, res: Response) => {
				const { topics } = res.locals;
				return res.status(200).json({ topics });
			});

		/**
		 * @POST    api/topic
		 * @desc    creates a topic
		 */
		this.app
			.route('/api/topic')
<<<<<<< HEAD:server/kafka/topic/topic.routes.ts
			.post([TopicController.createTopics], (req: Request, res: Response) => {
				return res.sendStatus(200);
			});
=======
			.post(
				[
					TopicController.createTopics,
					KafkaController.describeCluster,
					TopicController.getAllTopicMetadata,
				],
				(req: Request, res: Response) => {
					const { cluster, metadata } = res.locals;
					return res.status(200).json({ cluster, metadata });
				}
			);
>>>>>>> 94f474ceb001f5e94444843d43c6177911190be2:server/Kafka/topic/topic.routes.ts

		/**
		 * @PUT     api/topic
		 * @desc    deletes topic records
		 */
		this.app
			.route('/api/topic')
			.put(
				[TopicController.deleteTopicRecords],
				(req: Request, res: Response) => {
					return res.sendStatus(200);
				}
			);

		/**
		 * @DELETE  api/topic
		 * @desc    deletes a topic
		 */
		this.app
			.route('/api/topic')
<<<<<<< HEAD:server/kafka/topic/topic.routes.ts
			.delete([TopicController.deleteTopic], (req: Request, res: Response) => {
				return res.sendStatus(200);
			});
=======
			.delete(
				[
					TopicController.deleteTopic,
					KafkaController.describeCluster,
					TopicController.getAllTopicMetadata,
				],
				(req: Request, res: Response) => {
					const { cluster, metadata } = res.locals;
					return res.status(200).json({ cluster, metadata });
				}
			);
>>>>>>> 94f474ceb001f5e94444843d43c6177911190be2:server/Kafka/topic/topic.routes.ts

		/**
		 * @POST    api/partition
		 * @desc    creates a partition for a topic
		 */
		this.app
			.route('/api/partition')
			.post(
				[TopicController.createPartition],
				(req: Request, res: Response) => {
<<<<<<< HEAD:server/kafka/topic/topic.routes.ts
					return res.sendStatus(200);
=======
					const { cluster, metadata } = res.locals;
					return res.status(200).json({ cluster, metadata });
>>>>>>> 94f474ceb001f5e94444843d43c6177911190be2:server/Kafka/topic/topic.routes.ts
				}
			);

		/**
		 * @GET     api/metadata
		 * @desc    get topic metadata
		 */
		this.app
			.route('/api/metadata')
			.get([TopicController.topicMetadata], (req: Request, res: Response) => {
				const { metadata } = res.locals;
				return res.status(200).json({ metadata });
			});

		/**
		 * @GET     api/offsets
		 * @desc    get topic offets
		 */
		this.app
			.route('/api/offsets')
			.get([TopicController.topicOffsets], (req: Request, res: Response) => {
				const { offsets } = res.locals;
				return res.status(200).json({ offsets });
			});

		return this.app;
	}
}
