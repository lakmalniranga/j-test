import promiseRouter from 'express-promise-router';

import { getSurvey } from '@modules/survey/controller';

const router = promiseRouter();

router.get('/:id', getSurvey);

export default router;
