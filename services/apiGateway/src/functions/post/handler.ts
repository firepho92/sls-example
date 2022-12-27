import 'reflect-metadata';
import schema from './schema';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpJoiValidatorMiddleware, { VALIDATOR_TYPE } from '../../../../../src/middleware/httpJoiValidatorMiddleware';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';

export const main = middy(async (event: any) => {
  console.log(event.body);
  return formatJSONResponse({
    event,
  });
});

main
  .use(httpJsonBodyParser())
  .use(httpJoiValidatorMiddleware({
    schema,
    type: VALIDATOR_TYPE.BODY,
  }))
  .use(httpResponseHandlerMiddleware());