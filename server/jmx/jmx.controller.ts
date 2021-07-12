import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import WebSocket from 'ws';
const Jolokia = require('jolokia');

export class JMXController {
	static fetchData: RequestHandler = async (req, res, next) => {
		console.log('jmx');
		// fetch('localhost:9999')
		// 	.then(res => res.text())
		// 	.then(data => console.log(data));
		// 	const wss = new WebSocket.Server({ port: 9999 });

		// 	wss.on('connection', function connection(ws) {
		// 		console.log('jmx connected');
		// 		ws.on('message', function incoming(message) {
		// 			console.log('received: %s', message);
		// 		});

		// 		ws.send('something');
		// 	});

		const jolokia = new Jolokia({
			url: 'localhost:9999',
			method: 'get',
		});

		console.log('jolokia', JSON.stringify(jolokia));

		console.log(jolokia.request());

		jolokia.list().then((val: any) => {
			console.log(val);
		});

		return next();
	};
}
// java -javaagent:./jmx_prometheus_javaagent-0.16.0.jar=8080:config.yaml -jar jmx_prometheus_javaagent-0.16.0.jar