import terminus from '@godaddy/terminus';
import http from 'http';

import servicesInitializer, { logger } from '@services';
import config from '@config';
import app from '@src/app';

/**
 * Get port from environment and store in Express.
 */
const port = config.PORT;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
servicesInitializer({});
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

terminus.createTerminus(server, {
	healthChecks: {
		'/health': healthCheck,
	},
	timeout: config.KILL_TIMEOUT,
	signals: ['SIGTERM', 'SIGINT'],
	onSignal,
});

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			logger.error(bind + ' requires elevated privileges');
			process.exit(1); // eslint-disable-line no-process-exit
			break;
		case 'EADDRINUSE':
			logger.error(bind + ' is already in use');
			process.exit(1); // eslint-disable-line no-process-exit
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	logger.log(`[${config.ENVIRONMENT}]`, 'Listening on ' + bind);
}

async function healthCheck() {
	return Promise.resolve(true);
}

/**
 * Should close long lived connection such as db, cache, websocket and etc.
 */
async function onSignal() {
	// return Promise.all([db.destroy(), redis.destroy()]);
	return;
}
