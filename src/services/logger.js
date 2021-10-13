import ServiceBase from './base';

/* eslint-disable no-console */
class Logger extends ServiceBase {
	async _initialize() {
		return true;
	}
	debug(...params) {
		console.log(...params);
	}
	log(...params) {
		console.log(...params);
	}
	error(...params) {
		console.error(...params);
	}
}

export default new Logger();
