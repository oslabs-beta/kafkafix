import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = 'http://localhost:9090/api/v1/query?query='

export class HostMetricsControllerr {

	/**
	 * @JMXAttribute Memory bytes used
	 * @MBean jvm_memory_bytes_used
	 * @desc Used bytes of a given JVM memory area
	 * @type Gauge
	 */
    

	/**
	 * @JMXAttribute CPU Usage
	 * @MBean process_cpu_seconds_total
	 * @desc total cpu usage
	 * @type Gauge
	 */

	/**
	 * @JMXAttribute Memory cache
	 * @MBean jvm_memory_pool_bytes_used {Code Cache}
	 * @desc Used bytes of a given JVM memory pool
	 * @type Gauge
	 */
}
