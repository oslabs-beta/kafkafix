import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import { handleAsync } from '../common';
import { MBeans } from './MBeans';

const url = process.env.PROMETHEUS;

export class ProducerMetricsController {
// outstanding_requests	Number of requests queued	Resource: Saturation	Four-letter words, AdminServer, JMX

// avg_latency	Amount of time it takes to respond to a client request (in ms)	Work: Throughput	Four-letter words, AdminServer, JMX

// num_alive_connections	Number of clients connected to ZooKeeper	Resource: Availability	Four-letter words, AdminServer, JMX

// followers	Number of active followers	Resource: Availability	Four-letter words, AdminServer

// pending_syncs	Number of pending syncs from followers	Other	Four-letter words, AdminServer, JMX

// open_file_descriptor_count	Number of file descriptors in use	Resource: Utilization	Four-letter words, AdminServer
}
