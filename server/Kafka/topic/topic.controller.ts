import { RequestHandler } from 'express';
import handleAsync from '../../common/handleAsync';

export class TopicController {
	/**
	 * list the names of all existing topics
	 * @returns {string[]}
	 */
	static listTopics: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const [topics, error] = await handleAsync(admin.listTopics());

		if (error) return next(error);
		res.locals.topics = topics;

		return next();
	};

	/** // ADD handle multiple topics
	 * create topics
	 * @param {string[]{}} topics
	 * @topic {string}
	 * @partitions {string}
	 * @returns {boolean}
	 */
	static createTopics: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic, partitions } = req.body;
		const [success, error] = await handleAsync(
			admin.createTopics({ topics: [{ topic, partitions }] })
		);

		if (error) return next(error);
		if (!success) return next('Topic already exists');

		return next();
	};

	/**
	 * @param {string[]} topics
	 * @topic string
	 */
	static deleteTopic: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic } = req.body;
		const [, error] = await handleAsync(
			admin.deleteTopics({ topics: [topic] })
		);

		if (error) return next(error);

		return next();
	};

	/**
	 * create partitions for a topic. It will resolve in case of success. In case of errors, method will throw exceptions
	 * @param topicPartitions {[]{}}
	 * @topic {string}
	 * @count {number}
	 */
	static createPartition: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic, count } = req.body;
		const [, error] = await handleAsync(
			admin.createPartitions({ topicPartitions: [{ topic, count }] })
		);

		if (error) return next(error);

		return next();
	};

	static topicMetadata: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic } = req.body;
		const [metadata, error] = await handleAsync(
			admin.fetchTopicMetadata({ topics: [topic] })
		);

		if (error) return next(error);
		res.locals.metadata = metadata;

		return next();
	};

	static getAllTopicMetadata: RequestHandler = async (rq, res, next) => {
		const { admin } = res.locals;
		const [metadata, error] = await handleAsync(admin.fetchTopicMetadata());

		if (error) return next(error);
		res.locals.metadata = metadata;

		return next();
	};

	/**
	 * @returns most recent offset for a topic
	 */
	static topicOffsets: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic } = req.body;
		const [offsets, error] = await handleAsync(admin.fetchTopicOffsets(topic));

		if (error) return next(error);
		res.locals.offsets = offsets;

		return next();
	};

	/**
	 * @returns most recent offset for a topic
	 */
	static TopicOffsetsByTimestamp: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { timestamp, topic } = req.body;
		const [offsets, error] = await handleAsync(
			admin.fetchTopicOffsetsByTimestamp(topic, timestamp)
		);

		if (error) return next(error);
		res.locals.offsets = offsets;

		return next();
	};

	/**
	 * Delete records from selected topic.
	 * @param {string} topic
	 * @param {[{ parition: number, offset: string }]} partitions
	 */
	static deleteTopicRecords: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic, partitions } = req.body;
		const [, error] = await handleAsync(
			admin.deleteTopicRecords({ topic, partitions })
		);

		if (error) return next(error);

		return next();
	};
}
