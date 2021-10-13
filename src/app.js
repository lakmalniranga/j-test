import requestLogger from 'morgan';
import express from 'express';
import cors from 'cors';

import surveyRouter from '@modules/survey/routes';
import { logger } from '@services';

const app = express();

app.use(requestLogger('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/survey', surveyRouter);

app.use(function (error, req, res, next) {
	logger.error(error);
	next(error);
});

app.use(function (error, req, res, next) {
	if (!res.headersSent && error.statusCode) {
		res.status(error.statusCode).send({
			error: error,
		});
	} else {
		next(error);
	}
});

process.on('unhandledRejection', (error, promise) => {
	logger.error('🔥 -> Promise rejection here: ', promise);
	logger.error('🐞 -> The error was: ', error);
});

process.on('uncaughtException', (error) => {
	logger.error('🔥 -> something terrible happened: ', error);
	logger.error('🐞 -> The error was: ', error);
	process.exit(1);
});

export default app;
