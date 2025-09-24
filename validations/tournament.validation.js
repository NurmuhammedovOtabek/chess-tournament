import Joi from "joi";

export const tournamentSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  type_id: Joi.number().integer().required(),
  address: Joi.string().min(2).max(100).required(),
  location: Joi.string().min(2).max(100).required(),
  status: Joi.string().valid("upcoming", "ongoing", "finished").required(),
  rounds: Joi.number().integer().min(1).required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().min(Joi.ref("start_date")).required(),
});
