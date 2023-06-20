import Joi from "joi";

const v1_0_0 = Joi.object({
  couple: Joi.array().items({
    name: Joi.string().max(120).required(),
    age: Joi.number().min(1).max(120)
  })
}).required();

const v1_0_1 = Joi.object({
  couple: Joi.array().items({
    name: Joi.string().max(120).required(),
    age: Joi.number().min(1).max(120)
  })
}).required();

export default {
  'Default': v1_0_0,
  '1.0.0': v1_0_0,
  '1.0.1': v1_0_1
}