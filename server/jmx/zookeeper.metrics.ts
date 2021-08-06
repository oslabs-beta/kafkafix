import type { Instance, Quantile, QuantileData } from '../types';

export class ZookeeperMetrics {
	/**
	 * @name zkRequestLatencyMs
	 * @MBean name kafka.server: type = ZooKeeperClientMetrics, name = ZooKeeperRequestLatencyMs
	 * @desc zookeeper request latency ms
	 * @metricType Gauge
	 */
	static zkRequestLatencyMs = (payload: Quantile[]) => {
		const zkRequestLatencyMs: any = {};

		payload.forEach((data: Quantile) => {
			zkRequestLatencyMs[data.metric.quantile] = data.value;
		});

		return { zkRequestLatencyMs };
	};

	/**
	 * @name zkRequestLatencyMsCount
	 * @MBean name kafka.server: type = ZooKeeperClientMetrics, name = ZooKeeperRequestLatencyMs
	 * @desc zookeeper request latency ms count
	 * @metricType Gauge
	 */
	static zkRequestLatencyMsCount = (payload: Instance[]) => {
		return { zkRequestLatencyMsCount: payload[0].value };
	};
}
