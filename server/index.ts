import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import kafkaRoutes from './kafka/kafka.routes';

// initialize configuration
dotenv.config();

const PORT = process.env.PORT;
const app: Express = express();

app.use(express.json());

app.use('/api', kafkaRoutes);

app.use('*', (req: Request, res: Response) => {
	return res.status(404).send('Invalid Route');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	const defaultErr = {
		status: 500,
		message: 'An error occurred',
	};

	const errorObj = Object.assign({}, defaultErr, err);
	console.error(errorObj.err);
	return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server on port ${PORT}`));
