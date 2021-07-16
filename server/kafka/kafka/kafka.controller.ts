import { RequestHandler } from 'express';
import { Admin, Kafka, logLevel } from 'kafkajs';
import * as WebSocket from 'ws';
import dotenv from 'dotenv';

import { consumer } from './consumer.controller';
import { producer } from './producer.controller';
import { handleAsync, logCreator } from '../../common';

dotenv.config();

// ADD handle online clusters
// ADD handle multiple mutliple brokers - broker discovery is done by kafka

export class KafkaController {
	/**
	 * @desc  starts an instance of kafka
	 */
	static kafka: RequestHandler = async (req, res, next) => {
		const PORT: number = req.body.PORT;
		const sasl = {
			mechanism: 'plain',
			username: process.env.KAFKA_USERNAME,
			password: process.env.KAFAK_PASSWORD,
		};
		const ssl = !!sasl;
		const kafka = new Kafka({
			clientId: 'kafkafix',
			brokers: [`localhost:${PORT}`],
			logLevel: logLevel.ERROR,
			logCreator,
			// ssl,
			// sasl,
		});

		req.app.locals.kafka = kafka;
		return next();
	};

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
