import fetch from 'node-fetch';
import * as WebSocket from 'ws';
import { RequestHandler } from 'express';

import { MBeans } from './MBeans';
import { handleAsync } from '../common';
import { JVMMetrics } from './jvm.metrics';
import { KafkaMetrics } from './kafka.metrics';
import { ZookeeperMetrics } from './zookeeper.metrics';

export class JMXController {
	static fetchMetrics: RequestHandler = (req, res, next) => {
		console.log('fetchMetrics');
		const ws: WebSocket = req.app.locals.ws;
		const url = 'http://localhost:9090/api/v1/query?query=';
		// timestamp = int(float(datetime.datetime.now().timestamp()) * 1000);

		setInterval(() => {
			Object.entries(MBeans).map(async ([metric, MBean]) => {
				const [response] = await handleAsync(fetch(`${url}${MBean}`));
				const payload = await response.json();
				const data = payload.data.result;
				let filtered;

				// Kafka Metrics
				if (metric === 'underReplicatedPartitions') {
					filtered = KafkaMetrics.underReplicatedPartitions(data);
				}
				if (metric === 'isrShrinksTotal') {
					filtered = KafkaMetrics.isrShrinksTotal(data);
				}
				if (metric === 'activeControllerCount') {
					filtered = KafkaMetrics.activeControllerCount(data);
				}
				if (metric === 'offlinePartitionsCount') {
					filtered = KafkaMetrics.offlinePartitionsCount(data);
				}
				if (metric === 'leaderElectionRateAndTimeMs') {
					filtered = KafkaMetrics.leaderElectionRateAndTimeMs(data);
				}
				if (metric === 'uncleanLeaderElectionsPerSec') {
					filtered = KafkaMetrics.uncleanLeaderElectionsPerSec(data);
				}
				if (metric === 'totalTimeMs') {
					filtered = KafkaMetrics.totalTimeMs(data);
				}
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
				if (metric === 'zkRequestLatencyMs') {
					filtered = ZookeeperMetrics.zkRequestLatencyMs(data);
				}
				if (metric === 'zkRequestLatencyMsCount') {
					filtered = ZookeeperMetrics.zkRequestLatencyMsCount(data);
				}

				ws.send(filtered);
			});
		}, 5000);

		return next();
	};
}
