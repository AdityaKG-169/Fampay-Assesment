import { set, connect, connection } from 'mongoose';

import serverConfig from './server.config';

set('strictQuery', true);
connect(serverConfig.mongoUri);
const db = connection;

export default db;
