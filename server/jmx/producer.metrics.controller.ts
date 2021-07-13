import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = process.env.PROMETHEUS;

export class ProducerMetricsController {
	/**
	 * @JMXAttribute CollectionCount
	 * @MBean java.lang:type=GarbageCollector,name=G1 (Young|Old) Generation
	 * @desc The total count of young or old garbage collection processes executed by the JVM
	 * @type Other
	 */
	/**
	 * @JMXAttribute CollectionTime
	 * @MBean java.lang:type=GarbageCollector,name=G1 (Young|Old) Generation
	 * @desc The total amount of time (in milliseconds) the JVM has spent executing young or old garbage collection processes
	 * @type Other
	 */
}
