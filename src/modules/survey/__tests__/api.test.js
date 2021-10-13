import { validate as isValidUUID } from 'uuid';
import HttpStatus from 'http-status-codes';
import superTest from 'supertest';

import app from '@src/app';
import { RESOURCE_NOT_FOUND, VALIDATION_ERROR } from '@errors';
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
});
