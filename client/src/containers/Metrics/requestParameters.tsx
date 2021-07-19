export const requestParameters = (): string[] => {
  return [
    'jmx_scrape_duration_seconds',

    'jmx_scrape_error',
    'jvm_gc_collection_seconds_count',

    'jvm_gc_collection_seconds_sum',

    'jvm_memory_bytes_committed',

    'jvm_memory_bytes_max',

    'jvm_memory_bytes_used',

    'jvm_memory_pool_bytes_committed',

    'jvm_memory_pool_bytes_max',

    'jvm_memory_pool_bytes_used',

    'kafka_cluster_partition_atminisr',

    'kafka_cluster_partition_insyncreplicascount',

    'kafka_cluster_partition_laststableoffsetlag',

    'kafka_cluster_partition_replicascount',

    'kafka_cluster_partition_underminisr',

    'kafka_cluster_partition_underreplicated',

    'kafka_controller_controllerchannelmanager_queuesize',

    'kafka_controller_controllerchannelmanager_requestrateandqueuetimems',

    'kafka_controller_controllerchannelmanager_requestrateandqueuetimems_count',

    'kafka_controller_controllerchannelmanager_totalqueuesize',

    'kafka_controller_controllereventmanager_eventqueuesize',
    'kafka_controller_controllereventmanager_eventqueuetimems',

    'kafka_controller_controllereventmanager_eventqueuetimems_count',

    'kafka_controller_controllerstats_autoleaderbalancerateandtimems',

    'kafka_controller_controllerstats_autoleaderbalancerateandtimems_count',

    'kafka_controller_controllerstats_controlledshutdownrateandtimems',

    'kafka_controller_controllerstats_controlledshutdownrateandtimems_count',

    'kafka_controller_controllerstats_controllerchangerateandtimems',

    'kafka_controller_controllerstats_controllerchangerateandtimems_count',

    'kafka_controller_controllerstats_controllershutdownrateandtimems',

    'kafka_controller_controllerstats_controllershutdownrateandtimems_count',

    'kafka_controller_controllerstats_isrchangerateandtimems',

    'kafka_controller_controllerstats_isrchangerateandtimems_count',

    'kafka_controller_controllerstats_leaderandisrresponsereceivedrateandtimems',

    'kafka_controller_controllerstats_leaderandisrresponsereceivedrateandtimems_count',

    'kafka_controller_controllerstats_leaderelectionrateandtimems',

    'kafka_controller_controllerstats_leaderelectionrateandtimems_count',

    'kafka_controller_controllerstats_listpartitionreassignmentrateandtimems',

    'kafka_controller_controllerstats_listpartitionreassignmentrateandtimems_count',

    'kafka_controller_controllerstats_logdirchangerateandtimems',

    'kafka_controller_controllerstats_logdirchangerateandtimems_count',

    'kafka_controller_controllerstats_manualleaderbalancerateandtimems',

    'kafka_controller_controllerstats_manualleaderbalancerateandtimems_count',

    'kafka_controller_controllerstats_partitionreassignmentrateandtimems',

    'kafka_controller_controllerstats_partitionreassignmentrateandtimems_count',

    'kafka_controller_controllerstats_topicchangerateandtimems',

    'kafka_controller_controllerstats_topicchangerateandtimems_count',

    'kafka_controller_controllerstats_topicdeletionrateandtimems',

    'kafka_controller_controllerstats_topicdeletionrateandtimems_count',

    'kafka_controller_controllerstats_topicuncleanleaderelectionenablerateandtimems',

    'kafka_controller_controllerstats_topicuncleanleaderelectionenablerateandtimems_count',

    'kafka_controller_controllerstats_uncleanleaderelectionenablerateandtimems',

    'kafka_controller_controllerstats_uncleanleaderelectionenablerateandtimems_count',

    'kafka_controller_controllerstats_uncleanleaderelections_total',

    'kafka_controller_controllerstats_updatefeaturesrateandtimems',

    'kafka_controller_controllerstats_updatefeaturesrateandtimems_count',

    'kafka_controller_kafkacontroller_activecontrollercount',

    'kafka_controller_kafkacontroller_controllerstate',

    'kafka_controller_kafkacontroller_globalpartitioncount',

    'kafka_controller_kafkacontroller_globaltopiccount',

    'kafka_controller_kafkacontroller_offlinepartitionscount',

    'kafka_controller_kafkacontroller_preferredreplicaimbalancecount',

    'kafka_controller_kafkacontroller_replicasineligibletodeletecount',

    'kafka_controller_kafkacontroller_replicastodeletecount',

    'kafka_controller_kafkacontroller_topicsineligibletodeletecount',

    'kafka_controller_kafkacontroller_topicstodeletecount',

    'kafka_coordinator_group_groupmetadatamanager_numgroups',

    'kafka_coordinator_group_groupmetadatamanager_numgroupscompletingrebalance',

    'kafka_coordinator_group_groupmetadatamanager_numgroupsdead',

    'kafka_coordinator_group_groupmetadatamanager_numgroupsempty',

    'kafka_coordinator_group_groupmetadatamanager_numgroupspreparingrebalance',

    'kafka_coordinator_group_groupmetadatamanager_numgroupsstable',

    'kafka_coordinator_group_groupmetadatamanager_numoffsets',

    'kafka_coordinator_transaction_transactionmarkerchannelmanager_logappendretryqueuesize',

    'kafka_coordinator_transaction_transactionmarkerchannelmanager_unknowndestinationqueuesize',

    'kafka_log_log_logendoffset',

    'kafka_log_log_logstartoffset',

    'kafka_log_log_numlogsegments',

    'kafka_log_log_size',

    'kafka_log_logcleaner_cleaner_recopy_percent',

    'kafka_log_logcleaner_deadthreadcount',

    'kafka_log_logcleaner_max_buffer_utilization_percent',

    'kafka_log_logcleaner_max_clean_time_secs',

    'kafka_log_logcleaner_max_compaction_delay_secs',

    'kafka_log_logcleanermanager_max_dirty_percent',

    'kafka_log_logcleanermanager_time_since_last_run_ms',

    'kafka_log_logcleanermanager_uncleanable_bytes',

    'kafka_log_logcleanermanager_uncleanable_partitions_count',

    'kafka_log_logmanager_logdirectoryoffline',

    'kafka_log_logmanager_offlinelogdirectorycount',

    'kafka_network_acceptor_acceptorblockedpercent_count',

    'kafka_network_processor_idlepercent',

    'kafka_network_requestchannel_requestqueuesize',

    'kafka_network_requestchannel_responsequeuesize',

    'kafka_network_requestmetrics_errors_total',

    'kafka_network_requestmetrics_localtimems',

    'kafka_network_requestmetrics_localtimems_count',

    'kafka_network_requestmetrics_messageconversionstimems',

    'kafka_network_requestmetrics_messageconversionstimems_count',

    'kafka_network_requestmetrics_remotetimems',

    'kafka_network_requestmetrics_remotetimems_count',

    'kafka_network_requestmetrics_requestbytes',

    'kafka_network_requestmetrics_requestbytes_count',

    'kafka_network_requestmetrics_requestqueuetimems',

    'kafka_network_requestmetrics_requestqueuetimems_count',

    'kafka_network_requestmetrics_requests_total',

    'kafka_network_requestmetrics_responsequeuetimems',

    'kafka_network_requestmetrics_responsequeuetimems_count',

    'kafka_network_requestmetrics_responsesendtimems',

    'kafka_network_requestmetrics_responsesendtimems_count',

    'kafka_network_requestmetrics_temporarymemorybytes',

    'kafka_network_requestmetrics_temporarymemorybytes_count',

    'kafka_network_requestmetrics_throttletimems',

    'kafka_network_requestmetrics_throttletimems_count',
    'kafka_network_requestmetrics_totaltimems',

    'kafka_network_requestmetrics_totaltimems_count',

    'kafka_network_socketserver_controlplaneexpiredconnectionskilledcount',

    'kafka_network_socketserver_controlplanenetworkprocessoravgidlepercent',

    'kafka_network_socketserver_expiredconnectionskilledcount',

    'kafka_network_socketserver_memorypoolavailable',

    'kafka_network_socketserver_memorypoolused',

    'kafka_network_socketserver_networkprocessoravgidlepercent',

    'kafka_server_brokertopicmetrics_bytesin_total',

    'kafka_server_brokertopicmetrics_bytesout_total',

    'kafka_server_brokertopicmetrics_bytesrejected_total',

    'kafka_server_brokertopicmetrics_failedfetchrequests_total',

    'kafka_server_brokertopicmetrics_failedproducerequests_total',

    'kafka_server_brokertopicmetrics_fetchmessageconversions_total',

    'kafka_server_brokertopicmetrics_invalidmagicnumberrecords_total',

    'kafka_server_brokertopicmetrics_invalidmessagecrcrecords_total',

    'kafka_server_brokertopicmetrics_invalidoffsetorsequencerecords_total',

    'kafka_server_brokertopicmetrics_messagesin_total',

    'kafka_server_brokertopicmetrics_nokeycompactedtopicrecords_total',

    'kafka_server_brokertopicmetrics_producemessageconversions_total',

    'kafka_server_brokertopicmetrics_reassignmentbytesin_total',

    'kafka_server_brokertopicmetrics_reassignmentbytesout_total',
    'kafka_server_brokertopicmetrics_replicationbytesin_total',

    'kafka_server_brokertopicmetrics_replicationbytesout_total',

    'kafka_server_brokertopicmetrics_totalfetchrequests_total',

    'kafka_server_brokertopicmetrics_totalproducerequests_total',

    'kafka_server_delayedfetchmetrics_expires_total',

    'kafka_server_delayedoperationpurgatory_numdelayedoperations',

    'kafka_server_delayedoperationpurgatory_purgatorysize',

    'kafka_server_fetchsessioncache_incrementalfetchsessionevictions_total',

    'kafka_server_fetchsessioncache_numincrementalfetchpartitionscached',

    'kafka_server_fetchsessioncache_numincrementalfetchsessions',

    'kafka_server_kafkarequesthandlerpool_requesthandleravgidlepercent_count',

    'kafka_server_kafkaserver_brokerstate',

    'kafka_server_kafkaserver_linux_disk_read_bytes',

    'kafka_server_kafkaserver_linux_disk_write_bytes',

    'kafka_server_kafkaserver_yammer_metrics_count',

    'kafka_server_replicaalterlogdirsmanager_deadthreadcount',

    'kafka_server_replicaalterlogdirsmanager_failedpartitionscount',

    'kafka_server_replicaalterlogdirsmanager_maxlag',

    'kafka_server_replicaalterlogdirsmanager_minfetchrate',

    'kafka_server_replicafetchermanager_deadthreadcount',

    'kafka_server_replicafetchermanager_failedpartitionscount',

    'kafka_server_replicafetchermanager_maxlag',

    'kafka_server_replicafetchermanager_minfetchrate',

    'kafka_server_replicamanager_atminisrpartitioncount',

    'kafka_server_replicamanager_failedisrupdates_total',

    'kafka_server_replicamanager_isrexpands_total',

    'kafka_server_replicamanager_isrshrinks_total',

    'kafka_server_replicamanager_leadercount',

    'kafka_server_replicamanager_offlinereplicacount',

    'kafka_server_replicamanager_partitioncount',

    'kafka_server_replicamanager_reassigningpartitions',

    'kafka_server_replicamanager_underminisrpartitioncount',

    'kafka_server_replicamanager_underreplicatedpartitions',
    'kafka_server_sessionexpirelistener_zookeeperauthfailures_total',

    'kafka_server_sessionexpirelistener_zookeeperdisconnects_total',

    'kafka_server_sessionexpirelistener_zookeeperexpires_total',

    'kafka_server_sessionexpirelistener_zookeeperreadonlyconnects_total',

    'kafka_server_sessionexpirelistener_zookeepersaslauthentications_total',

    'kafka_server_sessionexpirelistener_zookeepersyncconnects_total',

    'kafka_server_zookeeperclientmetrics_zookeeperrequestlatencyms',

    'kafka_server_zookeeperclientmetrics_zookeeperrequestlatencyms_count',

    'kafka_utils_throttler_cleaner_io_count',

    'process_cpu_seconds_total',

    'process_max_fds',

    'process_open_fds',

    'process_resident_memory_bytes',

    'process_start_time_seconds',

    'process_virtual_memory_bytes',

    'scrape_duration_seconds',

    'scrape_samples_post_metric_relabeling',

    'scrape_samples_scraped',
    'scrape_series_added',
  ];
};
