import { RequestHandler } from 'express';
import { Kafka } from 'kafkajs';
import * as WebSocket from 'ws';

import handleAsync from '../common/handleAsync';
import { consumer, producer } from './kafka.controller';

// ADD - commander -  User must run zookeeper and server on their own
// ADD a command to start docker compose file
// ADD handle multiple ports: only 9092

export class AdminController {
	static kafka: RequestHandler = async (req, res, next) => {
		console.log('admin: kafka');
		const PORT: number = req.body.PORT;
		const ws: WebSocket = req.app.locals.ws;
		const server = req.app.locals.server;

		const kafka = new Kafka({
			clientId: 'my-app',
			brokers: [`localhost:${PORT}`],
		});
		const admin = kafka.admin();
		const [, error] = await handleAsync(admin.connect());

		if (error) return next(error);
		res.locals.admin = admin;

		producer(kafka);
		consumer(kafka, ws, server);

		return next();
	};

	/**
	 * get information about the broker cluster
	 * @returns { brokers: [ nodeId: number, host: string, port: number], controller: number, clusterId: string}
	 */
	static describeCluster: RequestHandler = async (rq, res, next) => {
		const { admin } = res.locals;
		const [cluster, error] = await handleAsync(admin.describeCluster());

		if (error) return next(error);
		res.locals.cluster = cluster;

		return next();
	};
}
