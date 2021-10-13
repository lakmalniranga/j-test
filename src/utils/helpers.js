import joi from 'joi';
import { VALIDATION_ERROR } from '@errors';

export function validateReq(dataKey, schema) {
	return function ValidateSchema(req) {
		const data = req[dataKey];
		const validator = joi.object({ ...schema });
		const isValid = validator.validate(data);

		if (isValid.error) {
			throw { ...VALIDATION_ERROR, errors: isValid.error.details };
		}

		return Promise.resolve('next');
	};
}

/**
 * If the error is unhandled, fallback error will be returned
 *
 * @param {Error} error could be an unhandled error or handled error
 * @param {Error} fallbackError pre-defined error in application
 */
export function throwError(error, fallbackError) {
	if (error.handledError) {
		throw error;
	}

	throw fallbackError;
}
