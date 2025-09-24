import Joi from "joi";

export const playerSchema = Joi.object({
  full_name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  rating: Joi.number().integer().min(0),
  country: Joi.string().min(2).max(50).required(),
  age: Joi.number().integer().min(5).max(100).required(),
});
