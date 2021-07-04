import { Application, Request, Response } from 'express';

import { RouteConfig } from '../../common/route.config';
import { GroupController } from './group.controller';

export class GroupRoutes extends RouteConfig {
	constructor(app: Application) {
		super(app, 'GroupRoutes');
	}

	routes() {
		/**
		 * @GET     api/grouplist
		 * @desc    get list of groups
		 */
		this.app
			.route('/api/grouplist')
			.get([GroupController.listGroups], (req: Request, res: Response) => {
				const { groups } = res.locals;
				return res.status(200).json({ groups });
			});

		/**
		 * @GET     api/groups
		 * @desc    get group description
		 */
		this.app
			.route('/api/groups')
			.get([GroupController.describeGroups], (req: Request, res: Response) => {
				const { groups } = res.locals;
				return res.status(200).json({ groups });
			});

		/**
		 * @DELETE  api/groups
		 * @desc    deletes a group
		 */
		this.app
			.route('/api/groups')
			.delete([GroupController.deleteGroups], (req: Request, res: Response) => {
				return res.sendStatus(200);
			});

		/**
		 * @GET     api/groupoffsets
		 * @desc    get offsets of a group
		 */
		this.app
			.route('/api/groupoffsets')
			.get([GroupController.groupOffsets], (req: Request, res: Response) => {
				const { offsets } = res.locals;
				return res.status(200).json({ offsets });
			});

		/**
		 * @PUT     api/groupoffsets
		 * @desc    reset group offsets
		 */
		this.app
			.route('/api/groupoffsets')
			.put(
				[GroupController.resetGroupOffsets],
				(req: Request, res: Response) => {
					res.sendStatus(200);
				}
			);

		return this.app;
	}
}
