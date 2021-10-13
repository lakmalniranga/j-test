import HttpStatus from 'http-status-codes';

import surveyBusiness from '@modules/survey/business';

export async function createSurvey(req, res) {
	const { question, answers } = req.body;
	const survey = await surveyBusiness.createSurvey({ question, answers });
	return res.status(HttpStatus.CREATED).json(survey);
}

export async function getSurvey(req, res) {
	const { surveyId } = req.params;
	const survey = await surveyBusiness.getSurvey({ surveyId });
	return res.json(survey);
}
