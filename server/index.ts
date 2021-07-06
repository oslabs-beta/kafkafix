import express, { Request, Response, ErrorRequestHandler } from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import dotenv from 'dotenv';
import cors from 'cors';

import { Mongoose } from './common/db';
import { RouteConfig } from './common/route.config';
import { AuthRoutes } from './auth/auth.routes';
import { GroupRoutes, KafkaRoutes, LogRoutes, TopicRoutes } from './kafka';

dotenv.config();

// initialize configuration
const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// start DB
new Mongoose();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const routes: Array<RouteConfig> = [];
routes.push(new AuthRoutes(app));
routes.push(new GroupRoutes(app));
routes.push(new KafkaRoutes(app));
routes.push(new LogRoutes(app));
routes.push(new TopicRoutes(app));

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
