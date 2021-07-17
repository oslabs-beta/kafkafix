import { RequestHandler } from 'express';
import { Producer } from 'kafkajs';

import { handleAsync, mockData } from '../../common';

// show list of producers / consumers
class ProducerController {
	static producer: RequestHandler = async (req, res, next) => {
		console.log('PRODUCER');
		// const { topic } = req.body;
		const topic = 'kafkafix';
		const producer: Producer = req.app.locals.kafka.producer();
		req.app.locals.producer[topic] = producer;

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

		return next();
	};
}

export default ProducerController;
