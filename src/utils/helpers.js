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
