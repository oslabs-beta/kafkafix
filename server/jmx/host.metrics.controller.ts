import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = process.env.PROMETHEUS;

//* Host-level broker metrics
export class HostMetricsControllerr {
	/**
	 * @name Page cache reads ratio
	 * @desc Ratio of reads from page cache vs reads from disk
	 * @metricType Resource: Saturation
	 */
	/**
	 * @name Disk usage
	 * @desc Disk space currently consumed vs. available
	 * @metricType Resource: Utilization
	 */
	/**
	 * @name CPU usage
	 * @desc CPU use
	 * @metricType Resource: Utilization
	 */
	/**
	 * @name Network bytes sent/received
	 * @desc FNetwork traffic in/out
	 * @metricType Resource: Utilization
	 */
	/**
	 * @name Bytes sent/received
	 * @desc Number of bytes sent / received by ZooKeeper hosts
	 * @metricType Resource: Utilization
	 */
	/**
	 * @name Usable memory
	 * @desc Amount of unused memory available to ZooKeeper
	 * @metricType Resource: Utilization
	 */
	/**
	 * @name Swap usage
	 * @desc Amount of swap space used by ZooKeeper
	 * @metricType Resource: Saturation
	 */
	/**
	 * @name Disk latency
	 * @desc Time delay between request for data and return of data from disk
	 * @metricType Resource: Saturation
	 */
}
