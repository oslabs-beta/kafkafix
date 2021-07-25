import fetch from 'node-fetch';
import { RequestHandler } from 'express';

import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = 'http://localhost:9090/api/v1/query?query=';

export class KafkaMetricsController {
	/**
	 * @name UnderReplicatedPartitions
	 * @MBean name kafka.server: type = ReplicaManager, name = UnderReplicatedPartitions
	 * @desc Number of unreplicated partitions
	 * @metricType Gauge
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
	 * @metricType Counter
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
	 * @metricType Gauge
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
	 * @metricType Gauge
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
	 * @metricType Gauge
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
	 * @metricType Gauge
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
	 * @metricType Gauge
	 */
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

		res.locals.totalTimeMs = { fetchConsumer, fetchFollower, produce };

		console.log(fetchConsumer);
		console.log(fetchFollower);
		console.log(produce);

		return next();
	};

	/**
	 * @name PurgatorySize
	 * @MBean kafka.server:type=DelayedOperationPurgatory,name=PurgatorySize,delayedOperation={Produce|Fetch}
	 * @desc Number of requests waiting in producer purgatory/Number of requests waiting in fetch purgatory
	 * @metricType Gauge
	 */
	static purgatorySize: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.purgatorySize;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		const Fetch: any[] = [];
		const produce: any[] = [];

		data.data.result.forEach((data: any) => {
			data.metric.delayedOperation === 'Fetch' ? Fetch.push(data) : null;
			data.metric.delayedOperation === 'Produce' ? produce.push(data) : null;
		});

		res.locals.purgatorySize = { fetch: Fetch, produce };

		return next();
	};

	/**
	 * @name BytesInPerSec/BytesOutPerSec
	 * @MBean kafka.server:type=BrokerTopicMetrics,name={BytesInPerSec|BytesOutPerSec}
	 * @desc Aggregate incoming/outgoing byte rate
	 * @metricType Counter
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

		res.locals.bytesPerTotal = { bytesInTotal, bytesOutTotal };

		return next();
	};

	/**
	 * @name RequestsPerSecond
	 * @MBean kafka.network:type=RequestMetrics,name=RequestsPerSec,request={Produce|FetchConsumer|FetchFollower},version={0|1|2|3|…}
	 * @desc Number of (producer|consumer|follower) requests per second
	 * @metricType Counter
	 */
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

		res.locals.requestsPerSecond = { fetchConsumer, fetchFollower, produce };

		return next();
	};

	/**
	 * @name MessagesPerSecond
	 * @MBean kafka.server,type=BrokerTopicMetrics,name=MessageInPerSec
	 * @desc Number of message requests per second
	 * @metricType Counter
	 */
	static messagesPerSecond: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.messagesPerSecond;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		res.locals.requestsPerSecond = data.data.result;

		return next();
	};
}
