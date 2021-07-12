import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = 'http://localhost:9090/api/v1/query?query=';

//* Host-level broker metrics
export class JVMMetricsController {
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
