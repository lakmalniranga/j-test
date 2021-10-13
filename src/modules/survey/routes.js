import promiseRouter from 'express-promise-router';

import { createSurveyValidation } from '@modules/survey/req-validation';
import { getSurvey, createSurvey } from '@modules/survey/controller';
import { validateReq } from '@utils/helpers';

const router = promiseRouter();

router.get('/:surveyId', getSurvey);
router.post('/', validateReq('body', createSurveyValidation), createSurvey);

// TODO: Answer to a survey

// TODO: Get results of survey

export default router;
