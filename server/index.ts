import express, { Request, Response, ErrorRequestHandler } from 'express';
const path = require('path');
import * as http from 'http';
import * as WebSocket from 'ws';
import dotenv from 'dotenv';
import cors from 'cors';

import { DB } from './db';
import { RouteConfig } from './common/route.config';
import { AuthRoutes } from './auth/auth.routes';
import { GroupRoutes } from './kafka/group/group.routes';
import { JMXRoutes } from './jmx/jmx.routes';
import { KafkaRoutes } from './kafka/kafka/kafka.routes';
import { LogRoutes } from './log/log.routes';
import { TopicRoutes } from './kafka/topic/topic.routes';

dotenv.config();

// initialize configuration
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// start DB
new DB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const routes: Array<RouteConfig> = [];
routes.push(new AuthRoutes(app));
routes.push(new GroupRoutes(app));
routes.push(new JMXRoutes(app));
routes.push(new KafkaRoutes(app));
routes.push(new LogRoutes(app));
routes.push(new TopicRoutes(app));

// server index html
app.get('/partition', (req, res) => {
	return res
		.status(200)
		.sendFile(path.resolve(__dirname, '../client/src/index.html'));
});

app.post('/api/dockerfile', (req, res) => {
	console.log('this is the request body =>', req.body);

	return res.status(200).json('recieved the dockerfile');
});

// 404
app.use('*', (req: Request, res: Response) => {
	return res.status(404).send('Invalid Route');
});

// global error handler
app.use(((err, req, res, next) => {
	const defaultErr = {
		status: 500,
		message: 'Error: Middleware error at global error handler',
	};
	const errorObj = Object.assign({}, defaultErr, err);
	return res.status(errorObj.status).json(errorObj.message);
}) as ErrorRequestHandler);

// server
server.listen(PORT, () => {
	console.log(`Server on port ${PORT}`);
	app.locals.server = server; //!

	routes.forEach((route: RouteConfig) => {
		console.log(`Route configured: ${route.routeName()}`);
	});
});

// websocket server
// CHECK if wss.on vs wss.once
wss.once('connection', (ws: WebSocket) => {
	app.locals.ws = ws;
	console.log('ws connected');

	ws.on('close', () => console.log('ws disconnected'));
});
