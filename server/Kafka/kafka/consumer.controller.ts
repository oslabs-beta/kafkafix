import { Kafka } from 'kafkajs';
import * as WebSocket from 'ws';

import handleAsync from '../../common/handleAsync';

// convert to class
// ADD add each consumer to app.locals
export const consumer = async (kafka: Kafka, ws: WebSocket) => {
	const topic = 'test-topic';
	const groupId = 'group1';
	const consumer = kafka.consumer({ groupId });

	const [, connectErr] = await handleAsync(consumer.connect());
	const [, subscribeErr] = await handleAsync(
		consumer.subscribe({ topic, fromBeginning: true })
	);
	if (connectErr) return connectErr;
	if (subscribeErr) return subscribeErr;

	await consumer.run({
		eachMessage: async ({ message }) => {
			console.log(`Consumer Received: ${message.value}`);
			ws.send(`Received: ${message.value}`);
		},
	});
};
