import joi from 'joi';

export const createSurveyValidation = {
	question: joi.string().required(),
	answers: joi.array().items(joi.string()).min(2),
};
