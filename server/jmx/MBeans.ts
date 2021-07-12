export enum MBeans {
	underReplicatedPartitions = 'kafka_server_replicamanager_underreplicatedpartitions',
  isrShrinksPerSec = 'kafka_server_replicamanager_isrshrinks_total',
	activeControllerCount = 'kafka_controller_kafkacontroller_activecontrollercount',
	offlinePartitionsCount = 'kafka_controller_kafkacontroller_offlinepartitionscount',
	leaderElectionRateAndTimeMs = 'kafka_controller_controllerstats_leaderelectionrateandtimems',
	uncleanLeaderElectionsPerSec = 'kafka_controller_controllerstats_topicuncleanleaderelectionenablerateandtimems',
	totalTimeMs = 'kafka_network_requestmetrics_totaltimems',
	purgatorySize = 'kafka_server_delayedoperationpurgatory_purgatorysize',
	bytesInTotal = 'kafka_server_brokertopicmetrics_bytesin_total',
	bytesOutTotal = 'kafka_server_brokertopicmetrics_bytesout_total',
	requestsPerSecond = 'kafka_network_requestmetrics_requests_total',
}
