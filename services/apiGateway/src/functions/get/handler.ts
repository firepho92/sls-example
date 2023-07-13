import 'reflect-metadata';
import middy from '@middy/core'
import versions from './versions';
import container from './inversify.config';
import TYPES from './TYPES';
import { APIGatewayProxyEvent } from 'aws-lambda';
import Handler from '../../../../../src/modules/infrastructure/app/Handler';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import httpRequestVersionHandlerMiddleware from '../../../../../src/middleware/httpRequestVersionHandlerMiddleware';

export const main = middy(async (event: APIGatewayProxyEvent & {version: string}) => {
  console.log('main handler', event.version);
  const handler = container.get<Handler>(TYPES[event.version]);
  const response = await handler.execute(event);
  console.log('main handler response', response);
  return response;
});

main
  .use(httpRequestVersionHandlerMiddleware(versions))
  .use(httpResponseHandlerMiddleware());