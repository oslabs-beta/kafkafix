import { Kafka } from 'kafkajs';
import WebSocket from 'ws';

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
	}, 1000);
};

export const consumer = async (kafka: Kafka, PORT: number) => {
	const topic = 'test-topic';
	const groupId = 'group1';
	const consumer = kafka.consumer({ groupId });

	const [, connectErr] = await handleAsync(consumer.connect());
	const [, subscribeErr] = await handleAsync(
		consumer.subscribe({ topic, fromBeginning: true })
	);

	if (connectErr) return connectErr;
	if (subscribeErr) return subscribeErr;

	const client = new WebSocket(`ws://localhost:${PORT}`);

	console.log('client', client);

	// CHECK ws wrap consumer.run? or keep
	// client.on('open', async () => {
	// 	await consumer.run({
	// 		eachMessage: async ({ message }) => {
	// 			// console.log(`Received: ${message.value}`);
	// 			client.send(`Received: ${message.value}`);
	// 		},
	// 	});
	// });
};
