import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = 'http://localhost:9090/api/v1/query?query=';

export class ZookeeperMetricsController {
	/**
	 * @name zkRequestLatencyMs
	 * @MBean name kafka.server: type = ZooKeeperClientMetrics, name = ZooKeeperRequestLatencyMs
	 * @desc zookeeper request latency ms
	 * @metricType Gauge
	 */
	static zkRequestLatencyMs: RequestHandler = async (req, res, next) => {
		const ws: WebSocket = req.app.locals.ws;
		const MBean = MBeans.zkRequestLatencyMs;

		// check
		setInterval(async () => {
			const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
			const data = await response.json();

			if (error) return next(error);
			// res.locals.zkRequestLatencyMs = data.data.result;
			ws.send(data.data.result);
		}, 5000);

		// return next();
	};

	/**
	 * @name zkRequestLatencyMsCount
	 * @MBean name kafka.server: type = ZooKeeperClientMetrics, name = ZooKeeperRequestLatencyMs
	 * @desc zookeeper request latency ms count
	 * @metricType Gauge
	 */
	static zkRequestLatencyMsCount: RequestHandler = async (req, res, next) => {
		const MBean = MBeans.zkRequestLatencyMsCount;
		const [response, error] = await handleAsync(fetch(`${url}${MBean}`));
		const data = await response.json(); // CHECK type - changed handle async

		if (error) return next(error);
		res.locals.zkRequestLatencyMsCount = data.data.result;

		return next();
	};

	// outstanding_requests	Number of requests queued	Resource: Saturation	Four-letter words, AdminServer, JMX
	// avg_latency	Amount of time it takes to respond to a client request (in ms)	Work: Throughput	Four-letter words, AdminServer, JMX
	// num_alive_connections	Number of clients connected to ZooKeeper	Resource: Availability	Four-letter words, AdminServer, JMX
	// followers	Number of active followers	Resource: Availability	Four-letter words, AdminServer
	// pending_syncs	Number of pending syncs from followers	Other	Four-letter words, AdminServer, JMX
	// open_file_descriptor_count	Number of file descriptors in use	Resource: Utilization	Four-letter words, AdminServer
}
