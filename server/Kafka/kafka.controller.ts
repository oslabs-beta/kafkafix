import { Request, Response, NextFunction } from 'express';
import { Kafka } from 'kafkajs';
import { Message } from './kafka.types';

// ADD handle multiple topics
export const producer = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const topic = 'test-topic';
	const { kafka } = res.locals;
	const producer = kafka.producer();

	await producer.connect();
	let i = 0;

	setInterval(async () => {
		try {
			await producer.send({
				topic,
				messages: [
					{
						key: String(i),
						value: `Message ${i++}`,
					},
				],
			});
		} catch (e) {
			console.error(e);
		}
	}, 1000);
};

// ADD types for message
export const consumer = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const topic = 'test-topic';
	const groupId = 'group1';
	const { kafka } = res.locals;
	const consumer = kafka.consumer({ groupId }); // need groupId?

	await consumer.connect();
	await consumer.subscribe({ topic, fromBeginning: true });
	await consumer.run({
		//! async
    eachMessage: async ({ message }) => {
			return console.log(`Received: ${message.value}`);
		},
	});
};
