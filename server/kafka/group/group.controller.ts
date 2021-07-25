import { RequestHandler } from 'express';
import { Admin } from 'kafkajs';

import { handleAsync } from '../../common';

export class GroupController {
	/**
	 * @desc      return the consumer group offset for a topic
	 * @param     {string}  topic
	 * @returns   {[]{}}
	 */
	static groupOffsets: RequestHandler = async (req, res, next) => {
		const admin: Admin = req.app.locals.admin;
		const { groupId, topic } = req.body;
		const [offsets, error] = await handleAsync(
			admin.fetchOffsets({ groupId, topic, resolveOffsets: true })
		);

		if (error) return next(error);
		res.locals.offsets = offsets;

		return next();
	};

	/**
	 * @desc    resets the consumer group offsets to the earliest or latest offset
	 * @param   {string}  groupId
	 * @param   {string}  topic
	 * @param   {boolean}  earliest
	 */
	static resetGroupOffsets: RequestHandler = async (req, res, next) => {
		const admin: Admin = req.app.locals.admin;
		const { groupId, topic, earliest } = req.body;
		const [, error] = await handleAsync(
			admin.resetOffsets({ groupId, topic, earliest })
		);

		if (error) return next(error);

		return next();
	};

	/**
	 * @desc    set the consumer group offset to any value
	 * @param   {string}  groupId
	 * @param   {string}  topic
	 * @param   {[]{}}    partitions
	 * @param   {number}  partition
	 * @param   {string}  offset
	 */
	static setGroupOffsets: RequestHandler = async (req, res, next) => {
		const admin: Admin = req.app.locals.admin;
		const { groupId, topic, partition, offset } = req.body;
		const [, error] = await handleAsync(
			admin.setOffsets({ groupId, topic, partitions: [{ partition, offset }] })
		);

		if (error) return next(error);

		return next();
	};

	/** 
	 * @desc resets the consumer group offset to the earliest or lastest offset (latest by default)
	 */

	static resetGroupOffsetsByTimestamp: RequestHandler = async (
		req,
		res,
		next
	) => {};

	/**
	 * @desc      list groups available on the broker
	 * @returns   {[]{}}
	 */
	static listGroups: RequestHandler = async (req, res, next) => {
		const admin: Admin = req.app.locals.admin;
		const [groups, error] = await handleAsync(admin.listGroups());

		if (error) return next(error);
		res.locals.groups = groups;

		return next();
	};

	/**
	 * @desc      describe consumer groups by groupIds
	 * @param     {string}  groupId
	 * @returns   {[]{}}
	 */
	static describeGroups: RequestHandler = async (req, res, next) => {
		const admin: Admin = req.app.locals.admin;
		const { groupId } = req.body;
		const [groups, error] = await handleAsync(admin.describeGroups([groupId]));

		if (error) return next(error);
		res.locals.groups = groups;

		return next();
	};

	/**
	 * @desc      delete groups by groupId
	 * @param     {string}  groupId
	 */
	static deleteGroups: RequestHandler = async (req, res, next) => {
		const admin: Admin = req.app.locals.admin;
		const { groupId } = req.body;
		const [, error] = await handleAsync(admin.deleteGroups([groupId]));

		if (error) return next(error);

		return next();
	};
}
