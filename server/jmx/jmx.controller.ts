import fetch from 'node-fetch';
import { RequestHandler } from 'express';
import WebSocket from 'ws';

export class JMXController {
	static fetchData: RequestHandler = async (req, res, next) => {
		console.log('jmx');
		fetch('localhost:9999')
			.then(res => res.text())
			.then(data => console.log(data));
		// 	const wss = new WebSocket.Server({ port: 9999 });

		// 	wss.on('connection', function connection(ws) {
		// 		console.log('jmx connected');
		// 		ws.on('message', function incoming(message) {
		// 			console.log('received: %s', message);
		// 		});

		// 		ws.send('something');
		// 	});

		return next();
	};
}
