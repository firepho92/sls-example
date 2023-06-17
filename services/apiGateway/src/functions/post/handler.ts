import 'reflect-metadata';
import schema from './schema';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import httpJoiValidatorMiddleware, { VALIDATOR_TYPE } from '../../../../../src/middleware/httpJoiValidatorMiddleware';
import { APIGatewayProxyEvent } from 'aws-lambda';
import httpRequestVersionHandlerMiddleware from '../../../../../src/middleware/httpRequestVersionHandlerMiddleware'
import v1_0_0 from './handler.v1_0_0';
import v1_0_1 from './handler.v1_0_1';
import Warning from '../../../../../src/utils/error/Warning';
import HttpStatusCode from '../../../../../src/utils/enums/httpStatusCode';
import versions from './versions';

export const main = middy(async (event: APIGatewayProxyEvent & {version: string}) => {
  const handlers = {
    '1.0.0': v1_0_0,
    '1.0.1': v1_0_1
  }
  try {
    const response = await handlers[event.version](event);
    return response;
  } catch (error) {
    console.error(error);
    throw new Warning(HttpStatusCode.BAD_REQUEST, [], [])
  }
});


main
  .use(httpRequestVersionHandlerMiddleware(versions))
  .use(httpJsonBodyParser())
  .use(httpJoiValidatorMiddleware({
    schemas: schema,
    type: VALIDATOR_TYPE.BODY,
  }))
  .use(httpResponseHandlerMiddleware());