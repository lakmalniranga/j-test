import {
	RESOURCE_NOT_FOUND,
	SURVEY_CREATION_FAILED,
	ANSWER_TO_SURVEY_FAILED,
	INVALID_ANSWER_GIVEN,
} from '@errors';
import surveyRepository from '@modules/survey/repository';
import { throwError } from '@utils/helpers';
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
			throwError(error, SURVEY_CREATION_FAILED);
		}
	}

	async answerToSurvey({ surveyId, answerId }) {
		try {
			// validate whether answerId
			const isAnswerValid = await this.validateAnswerId({ surveyId, answerId });
			if (!isAnswerValid) throw INVALID_ANSWER_GIVEN;

			return surveyRepository.addAnswer({ surveyId, answerId });
		} catch (error) {
			throwError(error, ANSWER_TO_SURVEY_FAILED);
		}
	}

	async validateAnswerId({ surveyId, answerId }) {
		const survey = await this.getSurvey({ surveyId });
		const answer = survey.answers.find((answer) => answer.answerId === answerId);
		return !!answer;
	}

	/**
	 * -- NOTE --
	 * This can be done in a optimized way when we use actual database engine.
	 * So we can utilize eager loading and database count methods
	 */
	async getSurveyResults({ surveyId }) {
		const { answers, ...rest } = await this.getSurvey({ surveyId });

		// get results for each answer
		const surveyResult = {};
		for (const { answerId } of answers) {
			const result = surveyRepository.getAnswersBySurveyIdAndAnswerId({
				surveyId,
				answerId,
			});
			surveyResult[answerId] = result.length;
		}

		// format results with original survey data
		const result = answers.map((answer) => {
			return { ...answer, result: surveyResult[answer.answerId] };
		});

		return { ...rest, result };
	}
}

export default new SurveyBusiness();
