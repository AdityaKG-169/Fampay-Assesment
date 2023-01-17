import { set, connect, connection } from 'mongoose';

import serverConfig from './server.config';

set('strictQuery', true);
connect(serverConfig.mongoUri, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
const db = connection;

export default db;
