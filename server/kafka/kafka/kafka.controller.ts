import { RequestHandler } from 'express';
import { Admin, Kafka, logLevel, SASLOptions } from 'kafkajs';
import * as WebSocket from 'ws';
import dotenv from 'dotenv';

import { consumer } from './consumer.controller';
import { producer } from './producer.controller';
import { handleAsync, logCreator } from '../../common';
import { LogController } from '../../log/log.controller';

dotenv.config();

export class KafkaController {
	/**
	 * @desc  starts an instance of kafka
	 */
	static kafka: RequestHandler = async (req, res, next) => {
		const PORT: number = req.body.PORT;
		const {
			KAFKA_USERNAME: username,
			KAFKA_PW: password,
			KAFKA_Server,
		} = process.env;
		const sasl =
			username && password ? { username, password, mechanism: 'plain' } : null;
		const ssl = !!sasl;
		const broker = PORT ? `localhost:${PORT}` : KAFKA_Server!;

		const kafka = new Kafka({
			clientId: 'kafkafix',
			brokers: [broker],
			logLevel: logLevel.ERROR,
			logCreator: LogController.logCreator,
			// ssl,
			// sasl,
		});

		req.app.locals.kafka = kafka;
		return next();
	};

	/**
	 * @desc  starts an instance of admin
	 */
	static admin: RequestHandler = async (req, res, next) => {
		const ws: WebSocket = req.app.locals.ws;
		const kafka: Kafka = req.app.locals.kafka;
		const admin = kafka.admin();
		const [, error] = await handleAsync(admin.connect());

		if (error) return next(error);
		req.app.locals.admin = admin;

		producer(kafka);
		consumer(kafka, ws);

		return next();
	};

	/**
	 * @desc      get information about the broker cluster
	 * @returns   {{}}
	 */
	static describeCluster: RequestHandler = async (req, res, next) => {
		const admin: Admin = req.app.locals.admin;
		const [cluster, error] = await handleAsync(admin.describeCluster());

		if (error) return next(error);
		res.locals.cluster = cluster;

		return next();
	};
}
