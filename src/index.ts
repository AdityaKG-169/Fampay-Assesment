import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import TServerResponse from './types/serverResponse.types';
import serverConfig from './config/server.config';
import db from './config/mongoose.config';
import callYouTube from './jobs/callYouTube.jobs';

import videosRoutes from './components/videos/routes.videos';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

// Connect to Database
db.on('error', (error: Error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

// Health Check Route
app.get('/', (_req: Request, res: Response) => {
	const responseObject: TServerResponse = {
		type: 'success',
		status: 200,
		message: 'Server is running',
		data: null,
		uniqueCode: 'SERVER_RUNNING',
	};
	return res.status(200).json(responseObject);
});

// Import Routes
app.use('/api/v1/videos', videosRoutes);

// 404 Route
app.get('*', (_req: Request, res: Response) => {
	const responseObject: TServerResponse = {
		type: 'error',
		status: 404,
		message: 'Route not found',
		data: null,
		uniqueCode: 'ROUTE_NOT_FOUND',
	};

	return res.status(404).json(responseObject);
});

// call youtube api and save videos to database
callYouTube();

const PORT = serverConfig.port;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
