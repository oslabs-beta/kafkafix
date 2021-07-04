import { RequestHandler } from 'express';
import handleAsync from '../../common/handleAsync';

export class TopicController {
	/**
	 * @desc      list the names of all existing topics
	 * @returns   {string[]}
	 */
	static listTopics: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const [topics, error] = await handleAsync(admin.listTopics());

		if (error) return next(error);
		res.locals.topics = topics;

		return next();
	};

	/** // ADD handle multiple topics
	 * @desc    create topics
	 * @param   {string[]{}}  topics
	 * @param   {string}      topic
	 * @param   {number}      partitions
	 * @returns {boolean}
	 */
	static createTopics: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic, partitions } = req.body;
		const [success, error] = await handleAsync(
			admin.createTopics({ topics: [{ topic, numPartitions: partitions }] })
		);

		if (error) return next(error);
		if (!success) return next('Topic already exists');

		return next();
	};

	/** // CHECK timeout prop optional? timeout: <Number>
	 * @desc    delete a topic
	 * @param   {string[]}  topics
	 * @param   { string }  topic
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
	 * @desc    create partitions for a topic.
	 * @secs    It will resolve in case of success. In case of errors, method will throw exceptions
	 * @param   {[]{}}    topicPartitions
	 * @param   {string}  topic
	 * @param   {number}  count
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

	/**
	 * @desc    get metadata of a topic
	 * @param   {string[]}  topics
	 * @param   {string}    topic
	 * @returns   // CHECK
	 */
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

	/**
	 * @desc     get metadata for all topics
	 * @returns  // CHECK
	 */
	static getAllTopicMetadata: RequestHandler = async (rq, res, next) => {
		const { admin } = res.locals;
		const [metadata, error] = await handleAsync(admin.fetchTopicMetadata());

		if (error) return next(error);
		res.locals.metadata = metadata;

		return next();
	};

	/**
	 * @desc      get most recent offset for a topic
	 * @param     {string}  topic
	 * @returns   {[]{}}
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
	 * @desc      get offset for a topic specified by timestamp
	 * @param     {string}  topic
	 * @param     {// ADD}  timestamp
	 * @returns   {[]{}}
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
	 * @desc    delete records from selected topic.
	 * @param   {string}  topic
	 * @param   {[]{}}    partitions
	 * @param   {number}  partition
	 * @param   {string}  offset
	 */
	static deleteTopicRecords: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { topic, partition, offset } = req.body;
		const [, error] = await handleAsync(
			admin.deleteTopicRecords({ topic, partitions: [{ partition, offset }] })
		);

		if (error) return next(error);

		return next();
	};
}
