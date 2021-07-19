import { RequestHandler } from 'express';
import { Producer } from 'kafkajs';
import process from 'process';

import { handleAsync, mockData } from '../../common';

class ProducerController {
	/**
	 * @desc     starts an instance of producer
	 */
	static startProducer: RequestHandler = async (req, res, next) => {
		const { topic } = req.body;
		const producer: Producer = req.app.locals.kafka.producer();

		req.app.locals.producers[topic] = producer;

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

		const errorTypes = ['unhandledRejection', 'uncaughtException'];
		const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

		errorTypes.map(type => {
			process.on(type, async () => {
				try {
					console.log(`process.on ${type}`);
					await producer.disconnect();
					process.exit(0);
				} catch (_) {
					process.exit(1);
				}
			});
		});

		signalTraps.map(type => {
			process.once(type, async () => {
				try {
					await producer.disconnect();
				} finally {
					process.kill(process.pid, type);
				}
			});
		});

		return next();
	};

	/**
	 * @desc     stops producer by given topic name
	 */
	static stopProducer: RequestHandler = async (req, res, next) => {
		const { topic } = req.body;
		const producer = req.app.locals.producers[topic];

		if (!producer) return next(new Error('producer does not exist'));

		const [, error] = await handleAsync(producer.disconnect());
		if (error) return next(error);

		delete req.app.locals.producer[topic];

		return next();
	};
}

export default ProducerController;
