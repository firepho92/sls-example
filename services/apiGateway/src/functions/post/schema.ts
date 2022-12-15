import Joi from "joi";

export default Joi.object({
  name: Joi.string().required(),
  age: Joi.number().min(1).max(120).optional()
}).required()