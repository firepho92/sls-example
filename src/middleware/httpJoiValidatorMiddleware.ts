import Joi from 'joi';
import HttpStatusCode from '../utils/enums/httpStatusCode';
import ErrorCode from '../utils/error/errorCode';
import Warning from '../utils/error/Warning';

/**
 * Enum for validation type
 * @readonly
 * @enum {VALIDATOR_TYPE}
 */

export enum VALIDATOR_TYPE {
  BODY = 'BODY',
  PATH = 'PATH',
  QUERY = 'QUERY',
}

/**
 * @interface IValidatorMiddleware
 * @description ValidatorMiddleware to adapt the data of validation
 * @property {Joi.ObjectSchema<any>} schema
 * @property {VALIDATOR_TYPE} type
 * @property {string} pathParam
 */

export interface IValidatorMiddleware {
  schema: Joi.ObjectSchema<any> | Joi.ArraySchema | Joi.StringSchema;
  type: VALIDATOR_TYPE;
  pathParam?: string;
}

/**
 * @function httpJoiValidatorMiddleware
 * @description Middleware to validate data
 * @param {IValidatorMiddleware} validationData
 * @TODO Add option to validate multiple path params if required
 */

const httpJoiValidatorMiddleware = (validateData: IValidatorMiddleware) => {
  const validatorMiddleware = async (request: any) => {
    try {
      // Validation for body
      if (validateData.type === VALIDATOR_TYPE['BODY']) {
        await validateData.schema.validateAsync(
          request.event.body,
          { abortEarly: false }
        );
      }

      // Validation for query
      if (validateData.type === VALIDATOR_TYPE['QUERY']) {
        await validateData.schema.validateAsync(
          request.event.queryStringParameters ? request.event.queryStringParameters : {},
          { abortEarly: false }
        );
      }

      // Validation for path
      if (validateData.type === VALIDATOR_TYPE['PATH']) {
        await validateData.schema.validateAsync(
          request.event.pathParameters[validateData.pathParam ? validateData.pathParam : 'id'],
          { abortEarly: false }
        );
      }
    } catch (err) {
      console.log('JOI ERR: ', err)

      let errorCodes = [];
      err.details.map( (detail: { message: string; }) => {
        if (ErrorCode[detail.message]){
          errorCodes.push(ErrorCode[detail.message]);
        }
      });
      if(errorCodes.length > 0){
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], errorCodes);
      }

      throw new Warning(HttpStatusCode.BAD_REQUEST, [], [ErrorCode.ERR0008]);
    }
  };

  return {
    before: validatorMiddleware,
  };
};

export default httpJoiValidatorMiddleware;