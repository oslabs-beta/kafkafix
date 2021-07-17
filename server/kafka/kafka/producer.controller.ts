import { RequestHandler } from 'express';
import { Producer } from 'kafkajs';

import { handleAsync, mockData } from '../../common';

class ProducerController {
	/**
	 * @desc     starts producer for all topics in the list
	 */
	static producer: RequestHandler = (req, res, next) => {
		const topics = res.locals.topics;

		topics.forEach(async (topic: string) => {
			const producer: Producer = req.app.locals.kafka.producer();
			const store = req.app.locals.producer;

			store[topic] ? store[topic].push(producer) : (store[topic] = [producer]);

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
				console.log(`message produced to topic: ${topic}`);
			}, 1000);
		});

		return next();
	};
}

export default ProducerController;
