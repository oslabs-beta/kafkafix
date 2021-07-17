import { RequestHandler } from 'express';
import { Consumer } from 'kafkajs';
import * as WebSocket from 'ws';

import { handleAsync } from '../../common';

export class ConsumerController {
	/**
	 * @desc     starts a consumer for given topic and groupId
	 */
	static consumer: RequestHandler = async (req, res, next) => {
		// const { topic, groupId } = req.body;
		const topic = 'test';
		const groupId = 'test consumer group 1';
		const ws: WebSocket = req.app.locals.ws;
		const consumer: Consumer = req.app.locals.kafka.consumer({ groupId });
		const store = req.app.locals.consumer;

		store[topic][groupId]
			? store[topic][groupId].push(consumer)
			: (store[topic][groupId] = []);

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
