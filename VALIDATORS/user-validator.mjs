import Joi from 'joi';

export const userValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().optional(),
  LasttName: Joi.string().optional(),
  dateOfBirth: Joi.date(), 
  telephone: Joi.number().optional(),
  country: Joi.string().optional()
});
