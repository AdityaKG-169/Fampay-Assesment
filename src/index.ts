import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import TServerResponse from './types/serverResponse.types';
import serverConfig from './config/server.config';
import db from './config/mongoose.config';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

// Handle errors from middlewares
app.use((err: Error, _req: Request, res: Response) => {
	const responseObject: TServerResponse = {
		type: 'error',
		status: 500,
		message: err.message,
		data: null,
		uniqueCode: 'SERVER_ERROR',
	};

	res.status(500).json(responseObject);
});

// Connect to Database
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Health Check Route
app.get('/', (_req, res) => {
	const responseObject: TServerResponse = {
		type: 'success',
		status: 200,
		message: 'Server is running',
		data: null,
		uniqueCode: 'SERVER_RUNNING',
	};
	res.status(200).json(responseObject);
});

// 404 Route
app.get('*', (_req, res) => {
	const responseObject: TServerResponse = {
		type: 'error',
		status: 404,
		message: 'Route not found',
		data: null,
		uniqueCode: 'ROUTE_NOT_FOUND',
	};

	res.status(404).json(responseObject);
});

const PORT = serverConfig.port;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
