import HttpStatus from 'http-status-codes';

export const INTERNAL_SERVER_ERROR = {
	statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
	message: 'Something went wrong from server side',
	name: 'INTERNAL_SERVER_ERROR',
};
