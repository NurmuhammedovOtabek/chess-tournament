import Joi from "joi"

const adminSchema = Joi.object({
    full_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    is_active: Joi.boolean(),
});

export default adminSchema