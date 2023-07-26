import 'reflect-metadata';
import schema from './schema';
import middy from '@middy/core';
import container from './inversify.config';
import TYPES from './TYPES';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import Handler from '../../../../../src/modules/infrastructure/app/Handler';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import { VALIDATOR_TYPE } from '../../../../../src/middleware/httpJoiValidatorMiddleware';
import APIGatewayEventBaseHandlerFactory from '../../../../../src/modules/infrastructure/app/APIGatewayEventBaseHandlerFactory';
import APIGatewayProxyEventHandlerParams from '../../../../../src/modules/infrastructure/app/APIGatewayProxyEventHandlerParams';

export const main = middy(async (event: APIGatewayProxyEvent) => {
  console.log('main handler', event);
  const handlerFactory = new APIGatewayEventBaseHandlerFactory(container, event, TYPES);
  const handler: Handler<APIGatewayProxyEventHandlerParams> = handlerFactory.getInstance();
  // const handler = container.get<Handler>(TYPES[event.version]);
  const response = await handler.execute({ event, validation: { schemas: schema, type: VALIDATOR_TYPE.BODY } });
  console.log('main handler response', response);
  return response;
});


main
  .use(httpJsonBodyParser())
  .use(httpResponseHandlerMiddleware());