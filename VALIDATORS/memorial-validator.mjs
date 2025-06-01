import Joi from 'joi';

export const postMemorialValidator= Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required(),
  mainPhoto: Joi.string().uri(),
  dateOfBirth: Joi.date().iso().optional(),
  dateOfDeath: Joi.date().iso().optional(),
  ageAtPassing: Joi.number().min(0).optional(),
  obituary: Joi.string(),
  time: Joi.string().optional(),
  title: Joi.string().trim().max(255).optional(),
  details: Joi.string().max(3000).optional(),
  photoGallery: Joi.array().items(Joi.string()),
  tribute: Joi.string().max(3000),
  livestreamLink: Joi.string().uri,
  acknowledgement: Joi.string().max(2000)
});
export const patchMemorialValidator = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required(),
  mainPhoto: Joi.string().uri(),
  dateOfBirth: Joi.date().iso().optional(),
  dateOfDeath: Joi.date().iso().optional(),
  ageAtPassing: Joi.number().min(0).optional(),
  obituary: Joi.string(),
  time: Joi.string().optional(),
  title: Joi.string().trim().max(255).optional(),
  details: Joi.string().max(3000).optional(),
  photoGallery: Joi.array().items(Joi.string()),
  tribute: Joi.string().max(3000),
  livestreamLink: Joi.string().uri,
  acknowledgement: Joi.string().max(2000)
});
