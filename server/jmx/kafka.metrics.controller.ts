import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = 'http://localhost:9090/api/v1/query?query=';

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
	 * IsrShrinksPerSec/IsrExpandsPerSec
	 * kafka.server:type=ReplicaManager,name=IsrShrinksPerSec
	 * kafka.server:type=ReplicaManager,name=IsrExpandsPerSec
	 * Rate at which the pool of in-sync replicas (ISRs) shrinks/expands
	 * Resource: Availability
	 */
	// CHECK only shows 1 item
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
	 * TotalTimeMs
	 * kafka.network:type=RequestMetrics,name=TotalTimeMs,request={Produce|FetchConsumer|FetchFollower}
	 * Total time (in ms) to serve the specified request (Produce/Fetch)
	 * Work: Performance
	 */
	// ADD Takeout Produce | FetchConsumer | FetchFollower from response
	static totalTimeMs: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.totalTimeMs;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		console.log(data.data.result);

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

	/** // CHECK
	 * BytesInPerSec/BytesOutPerSec
	 * kafka.server:type=BrokerTopicMetrics,name={BytesInPerSec|BytesOutPerSec}
	 * Aggregate incoming/outgoing byte rate
	 * Work: Throughput
	 */
	static bytesPerSec: RequestHandler = async (req, res, next) => {
		const MBean1 = MBeans.bytesInTotal;
		const MBean2 = MBeans.bytesOutTotal;
		const [response, error] = await handleAsync(fetch(`${url}${MBean1}`));
		const data = await response.json();

		if (error) return next(error);
		res.locals.bytesPerSec = data.data.result;

		return next();
	};

	/**
	 * RequestsPerSecond
	 * kafka.network:type=RequestMetrics,name=RequestsPerSec,request={Produce|FetchConsumer|FetchFollower},version={0|1|2|3|…}
	 * Number of (producer|consumer|follower) requests per second
	 * Work: Throughput
	 */
	static requestsPerSecond: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.requestsPerSecond;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json();

		if (error) return next(error);
		res.locals.requestsPerSecond = data.data.result;

		return next();
	};
}
