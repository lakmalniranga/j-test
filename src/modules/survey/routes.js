import promiseRouter from 'express-promise-router';

import { getSurvey, createSurvey } from '@modules/survey/controller';

const router = promiseRouter();

router.get('/:surveyId', getSurvey);
router.post('/', createSurvey);

// TODO: Answer to a survey

// TODO: Get results of survey

export default router;
