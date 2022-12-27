import Joi from "joi";

export default Joi.array().items({
  name: Joi.string().required(),
  age: Joi.number().min(1).max(120).optional()
}).required();