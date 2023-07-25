import 'reflect-metadata';
import TYPES from './TYPES';
import middy from '@middy/core'
import container from './inversify.config';
import { APIGatewayProxyEvent } from 'aws-lambda';
import Handler from '../../../../../src/modules/infrastructure/app/Handler';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import APIGatewayEventBaseHandlerFactory from '../../../../../src/modules/infrastructure/app/APIGatewayEventBaseHandlerFactory';

export const main = middy(async (event: APIGatewayProxyEvent) => {
  // console.log('main handler', event);
  // const handler = container.get<Handler>(TYPES[event.version]);
  const handlerFactory = new APIGatewayEventBaseHandlerFactory(container, event, TYPES);
  const handler: Handler = handlerFactory.getInstance();
  const response = await handler.execute(event);
  console.log('main handler response', response);
  return response;
});

main
  // .use(httpRequestVersionHandlerMiddleware(versions))
  .use(httpResponseHandlerMiddleware());