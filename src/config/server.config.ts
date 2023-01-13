import { config } from 'dotenv';

config();

// Type definition for the serverConfig object. The index signature [key: string]: { port: number }; allows any string key to be used to access a property that has a port property of number.

// Interface defined locally to this file because it is not used anywhere else.
interface IServerConfig {
	development: { port: number };
	production: { port: number };
	[key: string]: { port: number };
}

const serverConfig: IServerConfig = {
	development: {
		port: 8080,
	},
	production: {
		port: 8081,
	},
};

// Exports the serverConfig object based on the NODE_ENV environment variable. If NODE_ENV is not set, it defaults to 'development'.
const env = process.env.NODE_ENV || 'development';
export default serverConfig[env];
