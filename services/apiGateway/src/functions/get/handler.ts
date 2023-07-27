import 'reflect-metadata';
import TYPES from './TYPES';
import middy from '@middy/core'
import container from './inversify.config';
import { APIGatewayProxyEvent } from 'aws-lambda';
import Handler from '../../../../../src/modules/infrastructure/app/Handler';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import APIGatewayEventBaseControllerFactory from '../../../../../src/modules/infrastructure/app/APIGatewayEventBaseControllerFactory';

export const main = middy(async (event: APIGatewayProxyEvent) => {
  // console.log('main handler', event);
  // const handler = container.get<Handler>(TYPES[event.version]);
  const controllerFactory = new APIGatewayEventBaseControllerFactory(container, event, TYPES);
  const handler: Handler = controllerFactory.getInstance();
  const response = await handler.execute(event);
  console.log('main handler response', response);
  return response;
});

main
  // .use(httpRequestVersionHandlerMiddleware(versions))
  .use(httpResponseHandlerMiddleware());