// NO ES6 HERE as it's used by several binaries not using babel
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(process.cwd(), './.env') });

const environment = process.env.NODE_ENV || 'development';
const isLocal = !!process.env.NODE_ENV;
const port = parseInt(process.env.PORT) || 3333;

module.exports = {
	PORT: port,
	IS_LOCAL: isLocal,
	ENVIRONMENT: environment,
	IS_TEST: environment === 'test',
	IS_STAGING: environment === 'staging',
	IS_PRODUCTION: environment === 'production',
	IS_DEVELOPMENT: environment === 'development',
	KILL_TIMEOUT: parseInt(process.env.KILL_TIMEOUT) || 5 * 1000,
	NODE_APP_INSTANCE: parseInt(process.env.NODE_APP_INSTANCE) || 0,
	MAX_POSIBLE_ANSWERS_PER_QUESTION: parseInt(process.env.MAX_POSIBLE_ANSWERS_PER_QUESTION) || 5,
};
