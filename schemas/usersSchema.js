import Joi from 'joi'

export const userRegisterValidation = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.email': 'Email must be a valid email address',
			'any.required': 'Email is required',
		}),
	password: Joi.string().min(6).required().messages({
		'string.min': 'Password must be at least 6 characters long',
		'any.required': 'Password is required',
	}),
})

export const userLoginValidation = Joi.object({
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required()
		.messages({
			'string.email': 'Email must be a valid email address',
			'any.required': 'Email is required',
		}),
	password: Joi.string().min(6).required().messages({
		'string.min': 'Password must be at least 6 characters long',
		'any.required': 'Password is required',
	}),
})
