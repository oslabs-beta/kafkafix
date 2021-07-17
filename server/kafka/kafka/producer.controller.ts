import { RequestHandler } from 'express';
import { Kafka, Producer } from 'kafkajs';

import { handleAsync, mockData } from '../../common';

export const producer = async (kafka: Kafka) => {
  const topic = 'kafkafix';
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
    // console.log('message produced');
  }, 1000);
};

export class ProducerController {
  static producer: RequestHandler = async (req, res, next) => {
    const { topic } = req.body;
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

    console.log('Producer: next');
    return next();
  };
}
