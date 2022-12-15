import 'reflect-metadata';
import schema from './schema';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpJoiValidatorMiddleware, { VALIDATOR_TYPE } from '../../../../../src/middleware/httpJoiValidatorMiddleware';

export const main = middy(async (event: any) => {
  return formatJSONResponse({
    event,
  });
});

main
  .use(httpJsonBodyParser())
  .use(httpJoiValidatorMiddleware({
    schema,
    type: VALIDATOR_TYPE.BODY,
  }));