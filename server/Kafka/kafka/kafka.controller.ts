import { RequestHandler } from 'express';
import { Kafka } from 'kafkajs';
import * as WebSocket from 'ws';

import handleAsync from '../../common/handleAsync';
import { consumer } from './consumer.controller';
import { producer } from './producer.controller';

// ADD - commander -  User must run zookeeper and server on their own
// ADD a command to start docker compose file
// ADD handle multiple ports: only 9092

export class KafkaController {
	/**
	 * @desc    starts an instance of kafka
	 */
	static kafka: RequestHandler = async (req, res, next) => {
		console.log('kafka: kafka');
		const PORT: number = req.body.PORT;
		const ws: WebSocket = req.app.locals.ws;

		// ADD configure clientId
		const kafka = new Kafka({
			clientId: 'my-app',
			brokers: [`localhost:${PORT}`],
		});
		const admin = kafka.admin();
		const [, error] = await handleAsync(admin.connect());

		if (error) return next(error);

		// CHECK - if it works well
		// ADD - store each instance of consumer and producer in object: sort by: use PORT as key? topic? groupId?
		req.app.locals.kafka = { PORT: kafka };
		req.app.locals.admin = { PORT: admin };

		res.locals.admin = admin; // if app locals no need

		producer(kafka);
		consumer(kafka, ws);

		return next();
	};

	/**
	 * @desc      get information about the broker cluster
	 * @returns   {{}}
	 */
	static describeCluster: RequestHandler = async (rq, res, next) => {
		const { admin } = res.locals;
		const [cluster, error] = await handleAsync(admin.describeCluster());

		if (error) return next(error);
		res.locals.cluster = cluster;

		return next();
	};
}
