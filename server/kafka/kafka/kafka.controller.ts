import { RequestHandler } from 'express';
import { Admin, Kafka, logLevel } from 'kafkajs';
import { exec } from 'child_process';

import { LogController } from '../../log/log.controller';
import { handleAsync } from '../../common';

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
			logCreator: LogController.logCreator,
		});

		req.app.locals.kafka = kafka;
		req.app.locals.consumers = {};
		req.app.locals.producers = {};

		return next();
	};

	/**
	 * @desc  starts an instance of admin
	 */
	static admin: RequestHandler = async (req, res, next) => {
		const kafka: Kafka = req.app.locals.kafka;
		const admin = kafka.admin();
		const [, error] = await handleAsync(admin.connect());

		if (error) return next(error);
		req.app.locals.admin = admin;

		return next();
	};

	/**
	 * @desc      starts all containers
	 */
	//! send folder path?
	static composeUp: RequestHandler = async (req, res, next) => {
		const { filePath } = req.body;
		const folderPath = filePath.slice(0, filePath.lastIndexOf('\\'));
		exec(`docker compose up`, { cwd: folderPath });

		return next();
	};

	/**
	 * @desc      stops all containers
	 */
	//! I need path that was stored to docker compose down
	static composeDown: RequestHandler = async (req, res, next) => {
		const { folderPath } = req.body;
		exec(`docker compose down`, { cwd: folderPath });
    
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
