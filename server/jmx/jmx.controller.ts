import fetch from 'node-fetch';
import * as WebSocket from 'ws';
import { RequestHandler } from 'express';

import { MBeans } from './MBeans';
import { handleAsync } from '../common';
import { JVMMetrics } from './jvm.metrics';
import { KafkaMetrics } from './kafka.metrics';
import { ZookeeperMetrics } from './zookeeper.metrics';

// call it once when it's connected: otherwise it's going to memory leak
//! change route
export class JMXController {
	static fetchMetrics: RequestHandler = (req, res, next) => {
		console.log('fetchMetrics');
		const ws: WebSocket = req.app.locals.ws;
		const url = 'http://localhost:9090/api/v1/query?query=';
		// timestamp = int(float(datetime.datetime.now().timestamp()) * 1000);

		// think about sending a huge one object with all data
		setInterval(async () => {
			Object.entries(MBeans).map(async ([metric, MBean]) => {
				const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
				const payload = await response.json();
				const data = payload.data.result;
				let filtered;

				if (error) return next();

				// Kafka Metrics
				if (metric === 'underReplicatedPartitions') {
					filtered = KafkaMetrics.underReplicatedPartitions(data);
				}
				if (metric === 'isrShrinksPerSec') {
					filtered = KafkaMetrics.isrShrinksPerSec(data);
				}
				if (metric === 'activeControllerCount') {
					filtered = KafkaMetrics.activeControllerCount(data);
				}
				if (metric === 'offlinePartitionsCount') {
					filtered = KafkaMetrics.offlinePartitionsCount(data);
				}
				//! check how to handle - quantile
				// if (metric === 'leaderElectionRateAndTimeMs') {
				// 	filtered = KafkaMetrics.leaderElectionRateAndTimeMs(data);
				// }

				//! check how to handle - quantile
				// if (metric === 'uncleanLeaderElectionsPerSec') {
				// 	filtered = KafkaMetrics.uncleanLeaderElectionsPerSec(data);
				// }
				//! check
				// if (metric === 'totalTimeMs') {
				// 	filtered = KafkaMetrics.totalTimeMs(data);
				// }
				if (metric === 'purgatorySize') {
					filtered = KafkaMetrics.purgatorySize(data);
				}
				if (metric === 'bytesInPerSec') {
					filtered = KafkaMetrics.bytesInPerSec(data);
				}
				if (metric === 'bytesOutPerSec') {
					filtered = KafkaMetrics.bytesOutPerSec(data);
				}
				if (metric === 'requestsPerSecond') {
					filtered = KafkaMetrics.requestsPerSecond(data);
				}
				if (metric === 'messagesPerSecond') {
					filtered = KafkaMetrics.messagesPerSecond(data);
				}

				// JVM Metrics
				if (metric === 'garbageCollectionCount') {
					filtered = JVMMetrics.garbageCollectionCount(data);
				}
				if (metric === 'garbageCollectionTime') {
					filtered = JVMMetrics.garbageCollectionTime(data);
				}
				if (metric === 'memoryBytesUsed') {
					filtered = JVMMetrics.memoryBytesUsed(data);
				}
				if (metric === 'cpuSecondsTotal') {
					filtered = JVMMetrics.cpuSecondsTotal(data);
				}
				if (metric === 'memoryCacheUsed') {
					filtered = JVMMetrics.memoryCacheUsed(data);
				}

				// Zookeeper Metrics
				//! check - quantile
				// if (metric === 'zkRequestLatencyMs') {
				// 	filtered = ZookeeperMetrics.zkRequestLatencyMs(data);
				// }
				if (metric === 'zkRequestLatencyMsCount') {
					filtered = ZookeeperMetrics.zkRequestLatencyMsCount(data);
				}

				console.log(`metric: ${metric}`, filtered);
				// ws.send(filteredData)
			});
		}, 1000);

		return next();
	};
}
