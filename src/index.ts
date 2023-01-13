import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import serverConfig from './config/serverConfig';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());

const PORT = serverConfig.port;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
