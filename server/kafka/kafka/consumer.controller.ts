import { RequestHandler } from 'express';
import { Consumer } from 'kafkajs';
import * as WebSocket from 'ws';

import { handleAsync } from '../../common';

// saving consumers: app.locals or constructor?
export class ConsumerController {
	static consumer: RequestHandler = async (req, res, next) => {
		// const { topic, groupId } = req.body;
		const topic = 'kafkafix';
		const groupId = 'kafkafix';
		const ws: WebSocket = req.app.locals.ws;
		const consumer: Consumer = req.app.locals.kafka.consumer({ groupId });

		req.app.locals.consumer[groupId] = consumer;

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
}
