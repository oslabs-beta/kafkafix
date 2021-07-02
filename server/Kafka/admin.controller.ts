import { RequestHandler } from 'express';
import { Kafka } from 'kafkajs';

import handleAsync from '../common/handleAsync';
import { consumer, producer } from './kafka.controller';

// ADD - commander -  User must run zookeeper and server on their own
// ADD a command to start docker compose file
// ADD handle multiple ports: only 9092

export class AdminController {
	static kafka: RequestHandler = async (req, res, next) => {
		console.log('admin: kafka');
		const { PORT }: { PORT: number } = req.body;

		const kafka = new Kafka({
			clientId: 'my-app',
			brokers: [`localhost:${PORT}`],
		});
		const admin = kafka.admin();
		const [, error] = await handleAsync(admin.connect());

		if (error) return next(error);

		res.locals.admin = admin;

		producer(kafka);
		consumer(kafka, PORT);

		return next();
	};

	static getTopics: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const [topics, error] = await handleAsync(admin.listTopics());

		if (error) return next(error);
		res.locals.topics = topics;

		return next();
	};

	static createTopic: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic, partitions } = req.body;
		const [, error] = await handleAsync(
			admin.createTopics({ topics: [{ topic, partitions }] })
		);

		if (error) return next(error);

		return next();
	};

	static deleteTopic: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic } = req.body;
		const [, error] = await handleAsync(
			admin.deleteTopics({ topics: [topic] })
		);

		if (error) return next(error);

		return next();
	};

	static createPartition: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic, count } = req.body;
		const [, error] = await handleAsync(
			admin.createPartitions({ topicPartitions: [{ topic, count }] })
		);

		if (error) return next(error);

		return next();
	};

	static getTopicMetadata: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic } = req.body;
		const [metadata, error] = await handleAsync(
			await admin.fetchTopicMetadata({ topics: [topic] })
		);

		if (error) return next(error);
		res.locals.metadata = metadata;

		return next();
	};

	static getAllMetadata: RequestHandler = async (rq, res, next) => {
		const { admin } = res.locals;
		const [metadatas, error] = await handleAsync(
			await admin.fetchTopicMetadata()
		);

		if (error) return next(error);
		res.locals.metadatas = metadatas;

		return next();
	};
}
