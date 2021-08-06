import { Instance, Quantile } from '../types';

export class ZookeeperMetrics {
	/**
	 * @name zkRequestLatencyMs
	 * @MBean name kafka.server: type = ZooKeeperClientMetrics, name = ZooKeeperRequestLatencyMs
	 * @desc zookeeper request latency ms
	 * @metricType Gauge
	 */
	static zkRequestLatencyMs = (payload: Quantile[]) => {
		return payload;
	};

	/**
	 * @name zkRequestLatencyMsCount
	 * @MBean name kafka.server: type = ZooKeeperClientMetrics, name = ZooKeeperRequestLatencyMs
	 * @desc zookeeper request latency ms count
	 * @metricType Gauge
	 */
	static zkRequestLatencyMsCount = (payload: Instance[]) => {
		return payload[0].value;
	};
}
