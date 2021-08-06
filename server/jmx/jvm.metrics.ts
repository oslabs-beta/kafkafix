import type { Area, GarbageCollection, Instance, Pool } from '../types';

export class JVMMetrics {
	/**
	 * @JMXAttribute CollectionCount
	 * @MBean java.lang:type=GarbageCollector,name=G1 (Young|Old) Generation
	 * @desc The total count of young or old garbage collection processes executed by the JVM
	 * @type Other
	 */
	static garbageCollectionCount = (payload: GarbageCollection[]) => {
		let old;
		let young;

		payload.forEach((data: GarbageCollection) => {
			data.metric.gc === 'G1 Old Generation' ? (old = data.value) : null;
			data.metric.gc === 'G1 Young Generation' ? (young = data.value) : null;
		});

		return { garbageCollectionCount: { old, young } };
	};

	/**
	 * @JMXAttribute CollectionTime
	 * @MBean java.lang:type=GarbageCollector,name=G1 (Young|Old) Generation
	 * @desc The total amount of time (in milliseconds) the JVM has spent executing young or old garbage collection processes
	 * @type Other
	 */
	static garbageCollectionTime = (payload: GarbageCollection[]) => {
		let old;
		let young;

		payload.forEach((data: GarbageCollection) => {
			data.metric.gc === 'G1 Old Generation' ? (old = data.value) : null;
			data.metric.gc === 'G1 Young Generation' ? (young = data.value) : null;
		});

		return { garbageCollectionTime: { old, young } };
	};

	/**
	 * @JMXAttribute Memory bytes used
	 * @MBean jvm_memory_bytes_used
	 * @desc Used bytes of a given JVM memory area
	 * @type Gauge
	 */
	static memoryBytesUsed = (payload: Area[]) => {
		let heap;
		let nonheap;

		payload.forEach((data: Area) => {
			data.metric.area === 'heap' ? (heap = data.value) : null;
			data.metric.area === 'nonheap' ? (nonheap = data.value) : null;
		});

		return { heap, nonheap };
	};

	/**
	 * @JMXAttribute CPU Usage
	 * @MBean process_cpu_seconds_total
	 * @desc total cpu usage
	 * @type Gauge
	 */
	static cpuSecondsTotal = (payload: Instance[]) => {
		return { cpuSecondsTotal: payload[0].value };
	};

	/**
	 * @JMXAttribute Memory cache
	 * @MBean jvm_memory_pool_bytes_used {Code Cache}
	 * @desc Used bytes of a given JVM memory pool
	 * @type Gauge
	 */
	static memoryCacheUsed = (payload: Pool[]) => {
		let codeCache;

		payload.forEach((data: Pool) => {
			data.metric.pool === 'Code Cache' ? (codeCache = data.value) : null;
		});

		return { codeCache };
	};
}
