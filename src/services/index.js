export { default as logger } from './logger';

import logger from './logger';

export default async function initialize({ loggerConfig }) {
	await logger.initialize(loggerConfig);
}
