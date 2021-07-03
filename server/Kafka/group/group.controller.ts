import { RequestHandler } from 'express';
import handleAsync from '../../common/handleAsync';

export class GroupController {
	/**
	 * return the consumer group offset for a topic
	 * @returns [{ partition: 0, offset: '31004'}]
	 */
	static groupOffsets: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { groupId, topic } = req.body;
		const [offsets, error] = await handleAsync(
			admin.fetchOffsets({ groupId, topic, resolveOffsets: true })
		);

		if (error) return next(error);
		res.locals.offsets = offsets;

		return next();
	};

	/**
	 * resets the consumer group offset to the earliest or lastest offset (latest by default)
	 */
	static resetGroupOffsets: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { groupId, topic } = req.body;
		const [, error] = await handleAsync(admin.resetOffsets({ groupId, topic }));

		if (error) return next(error);

		return next();
	};

	/**
	 * resets the consumer group offset to the earliest or lastest offset (latest by default)
	 */
	// ADD handle multiple partitions
	static setGroupOffsets: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { groupId, topic, partition, offset } = req.body;
		const [, error] = await handleAsync(
			admin.setOffsets({ groupId, topic, partitions: [{ partition, offset }] })
		);

		if (error) return next(error);

		return next();
	};

	/**
	 * resets the consumer group offset to the earliest or lastest offset (latest by default)
	 */
	// ADD handle multiple partitions
	static resetGroupOffsetsByTimestamp: RequestHandler = async (
		req,
		res,
		next
	) => {};

	static listGroups: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const [groups, error] = await handleAsync(admin.listGroups());

		if (error) return next(error);
		res.locals.groups = groups;

		return next();
	};

	/**
	 * describe consumer groups by groupIds
	 */
	static describeGroups: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { groupId } = req.body;
		const [groups, error] = await handleAsync(admin.describeGroups([groupId]));

		if (error) return next(error);
		res.locals.groups = groups;

		return next();
	};

	static deleteGroups: RequestHandler = async (req, res, next) => {
		const { admin } = res.locals;
		const { groupId } = req.body;
		const [, error] = await handleAsync(admin.deleteGroups([groupId]));

		if (error) return next(error);

		return next();
	};
}
