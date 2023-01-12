import 'reflect-metadata';
import middy from '@middy/core'
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';

export const main = middy(async (event: any, context: any) => {
  console.log('event')
  console.log(event)
  console.log('context')
  console.log(context)
  return formatJSONResponse({
    event,
  }, 404);
});

main
  .use(httpResponseHandlerMiddleware());