import Joi from "joi";

export const chessTypeSchema = Joi.object({
  category: Joi.string()
    .valid("bullet", "blitz", "rapid", "correspondence")
    .required(),
  bese_time_minutes: Joi.number().valid(1, 2, 3, 5, 10, 15, 30).required(),
  increment_seconds: Joi.number().integer().min(0).max(300).required(),
  description: Joi.string().min(5).max(255).required(),
});
