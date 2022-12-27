import Joi from "joi";

export default Joi.object({
  couple: Joi.array().items({
    name: Joi.string().required(),
    age: Joi.number().min(1).max(120)
  })
}).required();