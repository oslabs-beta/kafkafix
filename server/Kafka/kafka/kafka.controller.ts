import { RequestHandler } from 'express';
import { Kafka, logLevel } from 'kafkajs';
import * as WebSocket from 'ws';

import handleAsync from '../../common/handleAsync';
import { consumer } from './consumer.controller';
import { producer } from './producer.controller';
import { logCreator } from '../../logger/logger';

// ADD - commander -  User must run zookeeper and server on their own
// ADD a command to start docker compose file
// ADD handle online clusters
// ADD handle multiple mutliple brokers - broker discovery is done by kafka

export class KafkaController {
	/**
	 * @desc  starts an instance of kafka
	 */
	static kafka: RequestHandler = async (req, res, next) => {
		const PORT: number = req.body.PORT;
		const kafka = new Kafka({
			clientId: 'kafkafix',
			brokers: [`localhost:${PORT}`],
			logLevel: logLevel.ERROR,
			logCreator,
		});

		req.app.locals.kafka = { [PORT]: kafka };
		return next();
	};

	static admin: RequestHandler = async (req, res, next) => {
		const PORT: number = req.body.PORT;
		const ws: WebSocket = req.app.locals.ws;
		const kafka: Kafka = req.app.locals.kafka[PORT];
		const admin = kafka.admin();
		const [, error] = await handleAsync(admin.connect());

		if (error) return next(error);
		req.app.locals.admin = { PORT: admin };

		res.locals.admin = admin;

		producer(kafka);
		consumer(kafka, ws);

		return next();
	};

	/**
	 * @desc      get information about the broker cluster
	 * @returns   {{}}
	 */
	static describeCluster: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const [cluster, error] = await handleAsync(admin.describeCluster());

		if (error) return next(error);
		res.locals.cluster = cluster;

		return next();
	};
}
