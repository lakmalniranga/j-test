import { v4 as uuidv4 } from 'uuid';

const surveys = [];

export class SurveyRepository {
	getSurveyById({ surveyId }) {
		return surveys.find((survey) => survey.surveyId === surveyId);
	}

	createSurvey({ question, answers }) {
		const surveyId = uuidv4();
		const posibleAnswers = answers.map((answer, index) => {
			return { id: index, value: answer };
		});
		surveys.push({ surveyId, question, answers: posibleAnswers });
		return surveyId;
	}
}

export default new SurveyRepository();
