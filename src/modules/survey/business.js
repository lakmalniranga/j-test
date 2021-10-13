import { RESOURCE_NOT_FOUND, SURVEY_CREATION_FAILED } from '@errors';
import surveyRepository from '@modules/survey/repository';
import Survey from '@dto/Survey';

class SurveyBusiness {
	async getSurvey({ surveyId }) {
		const survey = surveyRepository.getSurveyById({ surveyId });
		if (!survey) throw RESOURCE_NOT_FOUND;
		return Survey.create(survey);
	}

	async createSurvey({ question, answers }) {
		try {
			const surveyId = surveyRepository.createSurvey({ question, answers });
			return this.getSurvey({ surveyId });
		} catch (error) {
			throw SURVEY_CREATION_FAILED;
		}
	}
}

export default new SurveyBusiness();
