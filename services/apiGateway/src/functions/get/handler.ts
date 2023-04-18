import 'reflect-metadata';
import middy from '@middy/core'
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const main = middy(async (event: APIGatewayProxyEvent) => {
  console.log('event')
  console.log(event)
  console.log('context')
  console.log(event.requestContext)
  return formatJSONResponse({
    event,
  }, 404);
});

main
  .use(httpResponseHandlerMiddleware());