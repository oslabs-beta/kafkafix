import { format } from 'winston';
const winston = require('winston');
import Transport from 'winston-transport';
require('winston-mongodb').MongoDB;

interface IProps {
	namespace: string;
	log: any; // CHECK type
}

const { createLogger, transports } = winston;
const { combine, json, metadata, timestamp } = format;

export const logCreator = () => {
	const logger = createLogger({
		level: 'error',
		format: combine(
			timestamp({ format: 'YYY-MM-DD hh:mm:ss' }),
			json(),
			metadata()
		),
		transports: [
			new transports.Console(),
			// new transports.Http({
			// 	host: 'localhost',
			// 	port: 3000,
			// 	path: '/notification',
			// }),
			new transports.File({ filename: 'error.log' }),
			new transports.MongoDB({
				level: 'error',
				db: process.env.MONGO_URI,
				options: { useUnifiedTopology: true },
				collection: 'logs',
				format: combine(json(), metadata()),
			}),
		],
	});

	return ({
		namespace,
		log: { message, broker, clientId, error, groupId },
	}: IProps) => {
		logger.log({
			level: 'error',
			namespace,
			message,
			error,
			clientId,
			broker,
			groupId,
		});
	};
};

// server.once('upgrade', (req: any, socket: any, head: any) => {
// 	const path = url.parse(req.url).pathname;

// 	console.log('path', path);

// 	if (path === '/errors') {
// 		wss1.handleUpgrade(req, socket, head, ws => {
// 			console.log('ws: /errors');
// 			wss1.emit('connection', ws, req);
// 			ws.send(errorFormat);
// 		});
// 	} else socket.destory();
// });
