import express, { Request, Response, ErrorRequestHandler } from 'express';
import * as http from 'http'; // use if socket io
import dotenv from 'dotenv';

import { Mongoose } from './common/db';
import { RouteConfig } from './common/route.config';
import { AuthRoutes } from './auth/auth.routes';
import { KafkaRoutes } from './kafka/kafka.routes';

dotenv.config();

// initialize configuration
const PORT = process.env.PORT;
const app = express();

// start DB
new Mongoose();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
const routes: Array<RouteConfig> = [];
routes.push(new AuthRoutes(app));
routes.push(new KafkaRoutes(app));

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
app.listen(PORT, () => {
	console.log(`Server on port ${PORT}`);

	routes.forEach((route: RouteConfig) => {
		console.log(`Route configured: ${route.routeName()}`);
	});
});
