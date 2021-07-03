import { Kafka } from 'kafkajs';
import * as WebSocket from 'ws';

import handleAsync from '../common/handleAsync';
import { mockData } from '../common/mockData';

// ADD handle multiple topics
// ADD variable topic // multiple topics
export const producer = async (kafka: Kafka) => {
	const topic = 'test-topic';
	const producer = kafka.producer();
	const [, error] = await handleAsync(producer.connect());

	if (error) return error;

	let i = 0;
	setInterval(async () => {
		await producer.send({
			topic,
			messages: [
				{
					key: String(i),
					value: JSON.stringify(mockData[i++]),
				},
			],
		});
		console.log('message produced');
	}, 1000);
};

export const consumer = async (kafka: Kafka, ws: WebSocket, PORT: number) => {
	const topic = 'test-topic';
	const groupId = 'group1';
	const consumer = kafka.consumer({ groupId });

	const [, connectErr] = await handleAsync(consumer.connect());
	const [, subscribeErr] = await handleAsync(
		consumer.subscribe({ topic, fromBeginning: true })
	);

	if (connectErr) return connectErr;
	if (subscribeErr) return subscribeErr;

	// CHECK with client side
	ws.on('open', async () => {
		console.log('open');
		// ERROR does not run
		await consumer.run({
			eachMessage: async ({ message }) => {
				console.log('hi2');
				console.log(`Received: ${message.value}`);
				ws.send(`Received: ${message.value}`);
			},
		});
	});
};
