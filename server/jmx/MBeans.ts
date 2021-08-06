export enum MBeans {
	underReplicatedPartitions = 'kafka_server_replicamanager_underreplicatedpartitions',
	isrShrinksTotal = 'kafka_server_replicamanager_isrshrinks_total',
	activeControllerCount = 'kafka_controller_kafkacontroller_activecontrollercount',
	offlinePartitionsCount = 'kafka_controller_kafkacontroller_offlinepartitionscount',
	leaderElectionRateAndTimeMs = 'kafka_controller_controllerstats_leaderelectionrateandtimems',
	uncleanLeaderElectionsPerSec = 'kafka_controller_controllerstats_uncleanleaderelectionenablerateandtimems',
	totalTimeMs = 'kafka_network_requestmetrics_totaltimems',
	purgatorySize = 'kafka_server_delayedoperationpurgatory_purgatorysize',
	bytesInPerSec = 'kafka_server_brokertopicmetrics_bytesin_total',
	bytesOutPerSec = 'kafka_server_brokertopicmetrics_bytesout_total',
	requestsPerSecond = 'kafka_network_requestmetrics_requests_total',
	messagesPerSecond = 'kafka_server_brokertopicmetrics_messagesin_total',

	garbageCollectionCount = 'jvm_gc_collection_seconds_count',
	garbageCollectionTime = 'jvm_gc_collection_seconds_sum',
	memoryBytesUsed = 'jvm_memory_bytes_used',
	cpuSecondsTotal = 'process_cpu_seconds_total',
	memoryCacheUsed = 'jvm_memory_pool_bytes_used',

	zkRequestLatencyMs = 'kafka_server_zookeeperclientmetrics_zookeeperrequestlatencyms',
	zkRequestLatencyMsCount = 'kafka_server_zookeeperclientmetrics_zookeeperrequestlatencyms_count',
}
