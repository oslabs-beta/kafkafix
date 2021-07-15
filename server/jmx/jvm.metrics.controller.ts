import fetch from 'node-fetch';
import { RequestHandler } from 'express';

import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = process.env.PROMETHEUS;

export class JVMMetricsController {
	/**
	 * @JMXAttribute CollectionCount
	 * @MBean java.lang:type=GarbageCollector,name=G1 (Young|Old) Generation
	 * @desc The total count of young or old garbage collection processes executed by the JVM
	 * @type Other
	 */
	static garbageCollectionCount: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.garbageCollectionCount;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		const old: any[] = [];
		const young: any[] = [];

		data.data.result.forEach((data: any) => {
			data.metric.gc === 'G1 Old Generation' ? old.push(data) : null;
			data.metric.gc === 'G1 Young Generation' ? young.push(data) : null;
		});

		res.locals.garbageCollectionCount = { old, young };

		return next();
	};

	/**
	 * @JMXAttribute CollectionTime
	 * @MBean java.lang:type=GarbageCollector,name=G1 (Young|Old) Generation
	 * @desc The total amount of time (in milliseconds) the JVM has spent executing young or old garbage collection processes
	 * @type Other
	 */
	static garbageCollectionTime: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.garbageCollectionTime;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		const old: any[] = [];
		const young: any[] = [];

		data.data.result.forEach((data: any) => {
			data.metric.gc === 'G1 Old Generation' ? old.push(data) : null;
			data.metric.gc === 'G1 Young Generation' ? young.push(data) : null;
		});

		res.locals.garbageCollectionTime = { old, young };

		return next();
	};
}
