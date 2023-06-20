import 'reflect-metadata';
import schema from './schema';
import middy from '@middy/core';
import TYPES from '../../../../../src/TYPES';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import httpJoiValidatorMiddleware, { VALIDATOR_TYPE } from '../../../../../src/middleware/httpJoiValidatorMiddleware';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpRequestVersionHandlerMiddleware from '../../../../../src/middleware/httpRequestVersionHandlerMiddleware'
import versions from './versions';
import container from './inversify.config';
import Handler from '../../../../../src/modules/common/app/Handler';

export const main = middy(async (event: APIGatewayProxyEvent & {version: string}) => {
  console.log('main handler', event.version);
  const handler = container.get<Handler>(TYPES[event.version]);
  // const response = await handlers[event.version](event);
  const response = await handler.execute(event);
  console.log('main handler response', response);
  return response;
});


main
  .use(httpRequestVersionHandlerMiddleware(versions))
  .use(httpJsonBodyParser())
  .use(httpJoiValidatorMiddleware({
    schemas: schema,
    type: VALIDATOR_TYPE.BODY,
  }))
  .use(httpResponseHandlerMiddleware());