import { config } from 'dotenv';

config();

// Type definition for the serverConfig object. The index signature [key: string]: { port: number }; allows any string key to be used to access a property that has a port property of number.

// Interface defined locally to this file because it is not used anywhere else.
interface IServerConfig {
	development: { port: number; mongoUri: string };
	production: { port: number; mongoUri: string };
	[key: string]: { port: number; mongoUri: string };
}

const serverConfig: IServerConfig = {
	development: {
		port: 8080,
		mongoUri: 'mongodb://localhost:27017/fampay_assessment',
	},
	production: {
		port: 8081,
		mongoUri: process.env.MONGO_URI || '',
	},
};

// Exports the serverConfig object based on the NODE_ENV environment variable. If NODE_ENV is not set, it defaults to 'development'.
const env = process.env.NODE_ENV || 'development';
export default serverConfig[env];
