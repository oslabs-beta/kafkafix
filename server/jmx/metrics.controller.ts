import fetch from 'node-fetch';
import * as WebSocket from 'ws';
import { RequestHandler } from 'express';

import { MBeans } from './MBeans';
import { handleAsync } from '../common';

export class Metrics {
	static fetchMetrics: RequestHandler = (req, res, next) => {
		console.log('fetchMetrics');
		const ws: WebSocket = req.app.locals.ws;
		const url = 'http://localhost:9090/api/v1/query?query=';
		const urls = Object.entries(MBeans).map(MBean => `${url}${MBean}`);
		// const apiData = urls.map(async url => await handleAsync(fetch(url)));

		setInterval(() => {
			const datas = Promise.all(
				urls.map(async url => {
					const data = await handleAsync(fetch(url));
					// console.log('METRIC data', data);

					return data;
				})
			);

			console.log(datas);
			ws.send(datas);
		}, 5000);
	};
}
