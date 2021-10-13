import { validate as isValidUUID } from 'uuid';
import HttpStatus from 'http-status-codes';
import superTest from 'supertest';

import app from '@src/app';
import { INVALID_ANSWER_GIVEN, RESOURCE_NOT_FOUND, VALIDATION_ERROR } from '@errors';
import surveyRepository from '@modules/survey/repository';

const requestData = {
	question: 'what is your fav color',
	answers: ['black', 'white', 'blue', 'yellow'],
};

beforeAll(async () => {});

describe('modules/survey', () => {
	test('User should be able to create a survey', async () => {
		const res = await superTest(app)
			.post('/survey')
			.send(requestData)
			.expect(HttpStatus.CREATED);
		expect(res.body.question).toBe(requestData.question);
		expect(res.body.answers).toHaveLength(requestData.answers.length);
		expect(isValidUUID(res.body.surveyId)).toBeTruthy();
	});

	test('User should be able to get a survey by id', async () => {
		// Create survey
		const surveyId = surveyRepository.createSurvey({ ...requestData });

		const res = await superTest(app).get(`/survey/${surveyId}`).expect(HttpStatus.OK);
		expect(res.body.question).toBe(requestData.question);
		expect(res.body.answers).toHaveLength(requestData.answers.length);
		expect(res.body.surveyId).toBe(surveyId);
	});

	test('User should be able to see 404 if the survey id is invalid', async () => {
		const res = await superTest(app).get('/survey/111').expect(HttpStatus.NOT_FOUND);
		expect(res.body.error).toEqual(RESOURCE_NOT_FOUND);
	});

	test('User should be able to see validation error, if the number of answers are less than 2', async () => {
		const res = await superTest(app)
			.post('/survey')
			.send({
				question: 'what is your fav color',
				answers: ['black'],
			})
			.expect(HttpStatus.BAD_REQUEST);
		expect(res.body.error).toEqual(expect.objectContaining(VALIDATION_ERROR));
	});

	test('User should be able to provide answers to a survey', async () => {
		// Create survey
		const surveyId = surveyRepository.createSurvey({ ...requestData });

		await superTest(app)
			.post(`/survey/${surveyId}/answer`)
			.send({ answerId: 2 })
			.expect(HttpStatus.CREATED);

		const answers = surveyRepository.getAnswersBySurveyId({ surveyId });
		expect(answers[0]).toEqual(expect.objectContaining({ surveyId, answerId: 2 }));
	});

	test('User should NOT be able to provide invalid answerId to a survey', async () => {
		// Create survey
		const surveyId = surveyRepository.createSurvey({ ...requestData });

		const res = await superTest(app)
			.post(`/survey/${surveyId}/answer`)
			.send({ answerId: 5 })
			.expect(HttpStatus.BAD_REQUEST);

		expect(res.body.error).toEqual(expect.objectContaining(INVALID_ANSWER_GIVEN));
	});

	test('User should be able to see results of survey', async () => {
		// Create survey
		const surveyId = surveyRepository.createSurvey({ ...requestData });

		// answer to survey
		surveyRepository.addAnswer({ surveyId, answerId: 1 });
		surveyRepository.addAnswer({ surveyId, answerId: 1 });
		surveyRepository.addAnswer({ surveyId, answerId: 2 });

		const res = await superTest(app).get(`/survey/${surveyId}/result`).expect(HttpStatus.OK);

		expect(res.body.result).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ answerId: 0, result: 0, value: 'black' }),
				expect.objectContaining({ answerId: 1, result: 2, value: 'white' }),
				expect.objectContaining({ answerId: 3, result: 0, value: 'yellow' }),
				expect.objectContaining({ answerId: 2, result: 1, value: 'blue' }),
			])
		);
	});
});
