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
};

export const RESOURCE_NOT_FOUND = {
	statusCode: HttpStatus.NOT_FOUND,
	message: 'Resource not found',
	name: 'RESOURCE_NOT_FOUND',
};
