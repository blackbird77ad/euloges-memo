import Joi from 'joi';

export const userValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  telephone: Joi.number().optional(),
  
});
