import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import TServerResponse from './types/serverResponse.types';
import serverConfig from './config/serverConfig';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

// Health Check Route
app.get('/', (_req, res) => {
	const responseObject: TServerResponse = {
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
