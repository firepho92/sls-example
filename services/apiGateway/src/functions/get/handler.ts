import 'reflect-metadata';
import middy from '@middy/core'
import { formatJSONResponse } from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import httpJoiValidatorMiddleware from '../../../../../src/middleware/httpJoiValidatorMiddleware';
import schema from './schema';

export const main = middy(async (event: any) => {
  return formatJSONResponse({
    event,
  }, 404);
});

main
  .use(httpResponseHandlerMiddleware())
  .use(httpJoiValidatorMiddleware({
    schema: schema,
    type: VALIDATOR_TYPE.BODY,
  }));