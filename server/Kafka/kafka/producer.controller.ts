import { Kafka } from 'kafkajs';

import handleAsync from '../../common/handleAsync';
import { mockData } from '../../common/mockData';

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
					value: JSON.stringify(mockData[i++]),
				},
			],
		});
		console.log('message produced');
	}, 1000);
};
