import { RequestHandler } from 'express';
import { Kafka } from 'kafkajs';

// dont' need res, req: make regular fucntion?
// ADD handle multiple topics
// ADD get messages from mockData
export const producer: RequestHandler = async (req, res, next) => {
	const topic = 'test-topic'; // variable
	const kafka: Kafka = res.locals.kafka;
	const producer = kafka.producer();

	await producer.connect();

	let i = 0;
	setInterval(async () => {
		await producer.send({
			topic,
			messages: [
				{
					key: String(i),
					value: `Message ${i++}`,
				},
			],
		});
	}, 1000);
};

export const consumer: RequestHandler = async (req, res, next) => {
	const topic = 'test-topic'; // variable
	const groupId = 'group1'; //
	const kafka: Kafka = res.locals.kafka;
	const consumer = kafka.consumer({ groupId }); // need groupId?

	await consumer.connect();
	await consumer.subscribe({ topic, fromBeginning: true });
	await consumer.run({
		eachMessage: async ({ message }) => {
			return console.log(`Received: ${message.value}`);
		},
	});
};
