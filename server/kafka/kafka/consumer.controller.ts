import { RequestHandler } from 'express';
import { Consumer } from 'kafkajs';
import * as WebSocket from 'ws';

import { handleAsync } from '../../common';

export class ConsumerController {
	/**
	 * @desc     starts a consumer for given topic and groupId
	 */
	static startConsumer: RequestHandler = async (req, res, next) => {
		const { topic, groupId } = req.body;
		const ws: WebSocket = req.app.locals.ws;
		const consumer: Consumer = req.app.locals.kafka.consumer({ groupId });
		const store = req.app.locals.consumers;

		!store[topic] ? (store[topic] = {}) : (store[topic][groupId] = consumer);

		const [, connectErr] = await handleAsync(consumer.connect());
		const [, subscribeErr] = await handleAsync(
			consumer.subscribe({ topic, fromBeginning: true })
		);

		if (connectErr) return connectErr;
		if (subscribeErr) return subscribeErr;

		await consumer.run({
			partitionsConsumedConcurrently: 1,
			eachMessage: async ({
				topic,
				partition,
				message: { timestamp, value },
			}) => {
				const messageFormat = `timestamp: ${timestamp} topic: ${topic} partition: ${partition} message: ${value}`;
				console.log('message consumed');
				ws.send(messageFormat);
			},
		});

		return next();
	};

	/**
	 * @desc     stops consumer by given topic name and groupId
	 */
	static stopConsumer: RequestHandler = async (req, res, next) => {
		const { topic, groupId } = req.body;
		const consumer = req.app.locals.conumers[topic][groupId];

		if (!consumer) return next(new Error('consumer does not exist'));

		const [, error] = await handleAsync(consumer.disconnect());
		if (error) return next(error);

		delete req.app.locals.consumer[topic][groupId];

		return next();
	};
}
