import HttpStatus from 'http-status-codes';

export const INTERNAL_SERVER_ERROR = {
	statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	message: 'Something went wrong from server side',
	name: 'INTERNAL_SERVER_ERROR',
};

export const SURVEY_CREATION_FAILED = {
	statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	message: 'Survey creation failed due to an internal error',
	name: 'SURVEY_CREATION_FAILED',
	handledError: true,
};

export const ANSWER_TO_SURVEY_FAILED = {
	statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	message: 'Given answer has not recorded due to an internal error',
	name: 'ANSWER_TO_SURVEY_FAILED',
	handledError: true,
};

export const INVALID_ANSWER_GIVEN = {
	statusCode: HttpStatus.BAD_REQUEST,
	message: 'Given answer is invalid, and does not match with any of posible answers',
	name: 'INVALID_ANSWER_GIVEN',
	handledError: true,
};

export const RESOURCE_NOT_FOUND = {
	statusCode: HttpStatus.NOT_FOUND,
	message: 'Resource not found',
	name: 'RESOURCE_NOT_FOUND',
	handledError: true,
};

export const VALIDATION_ERROR = {
	statusCode: HttpStatus.BAD_REQUEST,
	message: 'Some of submitted are invalid',
	name: 'VALIDATION_ERROR',
};
