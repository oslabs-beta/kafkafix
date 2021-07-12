import { Kafka } from 'kafkajs';

import { handleAsync, mockData } from '../../common';

// ADD variable topic // multiple topics
export const producer = async (kafka: Kafka) => {
	const topic = 'kafkafix3';
	const producer = kafka.producer();
	const [, error] = await handleAsync(producer.connect());

	if (error) return error;

	let i = 0;
	setInterval(async () => {
		await producer.send({
			topic,
			messages: [
				{
					key: i.toString(),
					value: JSON.stringify(mockData[i++]),
				},
			],
		});
		console.log('message produced');
	}, 1000);
};
