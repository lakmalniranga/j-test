import { v4 as uuidv4 } from 'uuid';

const surveys = [];
const answers = [];

export class SurveyRepository {
	getSurveyById({ surveyId }) {
		return surveys.find((survey) => survey.surveyId === surveyId);
	}

	createSurvey({ question, answers }) {
		const surveyId = uuidv4();
		const posibleAnswers = answers.map((answer, index) => {
			return { answerId: index, value: answer };
		});
		surveys.push({ surveyId, question, answers: posibleAnswers });
		return surveyId;
	}

	addAnswer({ surveyId, answerId }) {
		const surveyAnswerId = uuidv4();
		answers.push({ surveyAnswerId, surveyId, answerId, createdAt: new Date() });
		return surveyAnswerId;
	}

	getAnswersBySurveyId({ surveyId }) {
		return answers.filter((answer) => answer.surveyId === surveyId);
	}

	getAnswersBySurveyIdAndAnswerId({ surveyId, answerId }) {
		return answers.filter(
			(answer) => answer.surveyId === surveyId && answer.answerId === answerId
		);
	}
}

export default new SurveyRepository();
