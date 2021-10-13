import promiseRouter from 'express-promise-router';

import { createSurveyValidation, answerToSurveyValidation } from '@modules/survey/req-validation';
import { getSurvey, createSurvey, answerToSurvey } from '@modules/survey/controller';
import { validateReq } from '@utils/helpers';

const router = promiseRouter();

router.get('/:surveyId', getSurvey);
router.post('/', validateReq('body', createSurveyValidation), createSurvey);
router.post('/:surveyId/answer', validateReq('body', answerToSurveyValidation), answerToSurvey);

// TODO: Get results of survey

export default router;
