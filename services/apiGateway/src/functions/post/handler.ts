import 'reflect-metadata';
import middy from '@middy/core';
import container from './inversify.config';
import TYPES from './TYPES';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import Handler from '../../../../../src/modules/infrastructure/controller/Handler';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import APIGatewayEventBaseControllerFactory from '../../../../../src/modules/infrastructure/controller/APIGatewayEventBaseControllerFactory';

export const main = middy(async (event: APIGatewayProxyEvent) => {
  // console.log('main handler', event);
  const controllerFactory = new APIGatewayEventBaseControllerFactory(container, event, TYPES);
  const handler: Handler<APIGatewayProxyEvent> = controllerFactory.getInstance();
  // const handler = container.get<Handler>(TYPES[event.version]);
  const response = await handler.execute(event);
  // console.log('main handler response', response);
  return response;
});


main
  .use(httpJsonBodyParser())
  .use(httpResponseHandlerMiddleware());