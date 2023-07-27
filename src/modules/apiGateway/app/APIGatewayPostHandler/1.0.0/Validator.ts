import Joi from 'joi';

export default class ValidationSchema {
  private schema: Joi.ObjectSchema;
  
  constructor() {
    this.schema = Joi.object({
      couple: Joi.array().items({
        name: Joi.string().max(120).required(),
        age: Joi.number().min(1).max(120)
      })
    }).required();
  }
}