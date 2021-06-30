import { RequestHandler } from 'express';
import { Kafka } from 'kafkajs';
import handleAsync from '../utils/handleAsync';

//! User must run zookeeper and server on their own
// ADD a command to start docker compose file

export class AdminController {
	/**
	 * create a new instance of kafka
	 * @PORT port passed in by user
	 */
	static kafka: RequestHandler = async (req, res, next) => {
		const { PORT } = req.body;

		const kafka = new Kafka({
			clientId: 'my-app',
			brokers: [`kafka1:${PORT}`],
		});
		const admin = kafka.admin();
		const [, error] = await handleAsync(admin.connect());

		if (error) return next(error);

		res.locals.kafka = kafka;
		res.locals.admin = admin;

		return next();
	};

	static getTopics: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const [topics, error] = await handleAsync(admin.listTopics());

		if (error) return next(error);
		res.locals.topics = topics;

		return next();
	};

	// ADD crate topic //? async
	static createTopics: RequestHandler = async (req, res, next) => {};

	/**
	 * topics: <String[]>
	 * timeout: <Number>
	 */
	static deleteTopics: RequestHandler = async (req, res, next) => {
		const { topics, timeout } = req.body;
	};

	static createPartitions: RequestHandler = async (req, res, next) => {
		const { topics, timeout } = req.body;
	};

	static getAllMetadata: RequestHandler = async (rq, res, next) => {};

	static getTopicMetadata: RequestHandler = async (rq, res, next) => {};
}
