import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import dotenv from 'dotenv';

import { handleAsync } from '../common';
import { MBeans } from './MBeans';

dotenv.config();

const url = process.env.PROMETHEUS;

//* Kafka-emitted metrics
export class KafkaMetricsController {
	/**
	 * @name UnderReplicatedPartitions
	 * @MBean name kafka.server: type = ReplicaManager, name = UnderReplicatedPartitions
	 * @desc Number of unreplicated partitions
	 * @metricType Resource: Availability
	 */
	static underReplicatedPartitions: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.underReplicatedPartitions;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json(); // CHECK type - changed handle async

		if (error) return next(error);
		res.locals.underReplicatedPartitions = data.data.result[0].value;

		return next();
	};

	/**
	 * @name IsrShrinksPerSec/IsrExpandsPerSec
	 * @MBean kafka.server:type=ReplicaManager,name=IsrShrinksPerSec
	 * @MBean kafka.server:type=ReplicaManager,name=IsrExpandsPerSec
	 * @desc Rate at which the pool of in-sync replicas (ISRs) shrinks/expands
	 * @metricTypeResource: Availability
	 */
	// CHECK only shows total: find shrink/expand
	static isrShrinksPerSec: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.isrShrinksPerSec;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		res.locals.isrShrinksPerSec = data.data.result;

		return next();
	};

	/**
	 * @name ActiveControllerCount
	 * @MBean kafka.controller:type=KafkaController,name=ActiveControllerCount
	 * @desc Number of active controllers in cluster
	 * @metricType Resource: Error
	 */
	static activeControllerCount: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.activeControllerCount;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		res.locals.activeControllerCount = data.data.result;

		return next();
	};

	/**
	 * @name OfflinePartitionsCount
	 * @MBean kafka.controller:type=KafkaController,name=OfflinePartitionsCount
	 * @desc Number of offline partitions
	 * @metricType Resource: Availability
	 */
	static offlinePartitionsCount: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.offlinePartitionsCount;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		res.locals.offlinePartitionsCount = data.data.result;

		return next();
	};

	/**
	 * @name LeaderElectionRateAndTimeMs
	 * @MBean kafka.controller:type=ControllerStats,name=LeaderElectionRateAndTimeMs
	 * @desc Leader election rate and latency
	 * @metricType Other
	 */
	static leaderElectionRateAndTimeMs: RequestHandler = async (
		req,
		res,
		next
	) => {
		const MBean = MBeans.leaderElectionRateAndTimeMs;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		res.locals.leaderElectionRateAndTimeMs = data.data.result;

		return next();
	};

	/**
	 * @name UncleanLeaderElectionsPerSec
	 * @MBean kafka.controller:type=ControllerStats,name=UncleanLeaderElectionsPerSec
	 * @desc Number of “unclean” elections per second
	 * @metricType Resource: Error
	 */
	static uncleanLeaderElectionsPerSec: RequestHandler = async (
		req,
		res,
		next
	) => {
		const MBean = MBeans.uncleanLeaderElectionsPerSec;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		res.locals.uncleanLeaderElectionsPerSec = data.data.result;

		return next();
	};

	/**
	 * @name TotalTimeMs
	 * @MBean kafka.network:type=RequestMetrics,name=TotalTimeMs,request={Produce|FetchConsumer|FetchFollower}
	 * @desc Total time (in ms) to serve the specified request (Produce/Fetch)
	 * @metricType Work: Performance
	 */
	// CHECK quantile
	static totalTimeMs: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.totalTimeMs;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		const fetchConsumer: any[] = [];
		const fetchFollower: any[] = [];
		const produce: any[] = [];

		data.data.result.forEach((data: any) => {
			data.metric.request === 'FetchConsumer' ? fetchConsumer.push(data) : null;
			data.metric.request === 'FetchFollower' ? fetchFollower.push(data) : null;
			data.metric.request === 'Produce' ? produce.push(data) : null;
		});

		res.locals.fetchConsumer = fetchConsumer;
		res.locals.fetchFollower = fetchFollower;
		res.locals.produce = produce;

		console.log(fetchConsumer);
		console.log(fetchFollower);
		console.log(produce);

		return next();
	};

	/**
	 * @name PurgatorySize
	 * @MBean kafka.server:type=DelayedOperationPurgatory,name=PurgatorySize,delayedOperation={Produce|Fetch}
	 * @desc Number of requests waiting in producer purgatory/Number of requests waiting in fetch purgatory
	 * @metricType Other
	 */
	static purgatorySize: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.purgatorySize;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		const Fetch: any[] = [];
		const Produce: any[] = [];

		data.data.result.forEach((data: any) => {
			data.metric.delayedOperation === 'Fetch' ? Fetch.push(data) : null;
			data.metric.delayedOperation === 'Produce' ? Produce.push(data) : null;
		});

		res.locals.fetch = Fetch;
		res.locals.produce = Produce;

		return next();
	};

	/**
	 * @name BytesInPerSec/BytesOutPerSec
	 * @MBean kafka.server:type=BrokerTopicMetrics,name={BytesInPerSec|BytesOutPerSec}
	 * @desc Aggregate incoming/outgoing byte rate
	 * @metricType Work: Throughput
	 */
	static bytesPerSec: RequestHandler = async (req, res, next) => {
		const MBeanIn = MBeans.bytesInTotal;
		const MBeanOut = MBeans.bytesOutTotal;

		const [bytesIn, inError] = await handleAsync(fetch(`${url}${MBeanIn}`));
		const [bytesOut, outError] = await handleAsync(fetch(`${url}${MBeanOut}`));

		const bytesInTotal = await bytesIn.json();
		const bytesOutTotal = await bytesOut.json();

		if (inError) return next(inError);
		if (outError) return next(outError);

		res.locals.bytesInTotal = bytesInTotal.data.result;
		res.locals.bytesOutTotal = bytesOutTotal.data.result;

		return next();
	};

	/**
	 * @name RequestsPerSecond
	 * @MBean kafka.network:type=RequestMetrics,name=RequestsPerSec,request={Produce|FetchConsumer|FetchFollower},version={0|1|2|3|…}
	 * @desc Number of (producer|consumer|follower) requests per second
	 * @metricType Work: Throughput
	 */
	// CHECK - need to test result with endpoint
	static requestsPerSecond: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.requestsPerSecond;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);

		const fetchConsumer: any[] = [];
		const fetchFollower: any[] = [];
		const produce: any[] = [];

		data.data.result.forEach((data: any) => {
			data.metric.delayedOperation === 'FetchConsumer'
				? fetchConsumer.push(data)
				: null;
			data.metric.delayedOperation === 'FetchFollower'
				? fetchFollower.push(data)
				: null;
			data.metric.delayedOperation === 'Produce' ? produce.push(data) : null;
		});

		res.locals.fetchConsumer = fetchConsumer;
		res.locals.FetchFollower = fetchFollower;
		res.locals.produce = produce;

		// console.log(res.locals.fetchConsumer);
		// console.log(res.locals.fetchFollower);
		// console.log(res.locals.produce);

		return next();
	};
}
