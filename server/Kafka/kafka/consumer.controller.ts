import { Kafka } from 'kafkajs';
import * as WebSocket from 'ws';

import { handleAsync } from '../../common';

// convert to class
// ADD add each consumer to app.locals
export const consumer = async (kafka: Kafka, ws: WebSocket) => {
	const topic = 'kafkafix';
	const groupId = 'group1';
	const consumer = kafka.consumer({ groupId });

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
			console.log(`Consumer Received: ${messageFormat}`);
			ws.send(messageFormat);
		},
	});
};
