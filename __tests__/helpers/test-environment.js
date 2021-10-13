/* eslint-disable no-console */
const NodeEnvironment = require('jest-environment-node');

class CustomEnvironment extends NodeEnvironment {
	constructor(config, context) {
		super(config, context);
	}

	/**
	 * NOTE: We will configure any required data source here, so we can do an e2e testing
	 * I have just created this file for demo purpose
	 */
	async setup() {
		try {
			console.info('Setup test enviroment!');
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	async teardown() {
		console.log('teardown test enviroment!');
		try {
			await super.teardown();
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
}

module.exports = CustomEnvironment;
