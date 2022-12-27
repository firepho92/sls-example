import 'reflect-metadata';
import middy from '@middy/core'
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import httpJsonBodyParser from '@middy/http-json-body-parser';

export const main = middy(async (event: any) => {
  return formatJSONResponse({
    event,
  }, 404);
});

main
  .use(httpResponseHandlerMiddleware());