import 'reflect-metadata';
import middy from '@middy/core';
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import { APIGatewayProxyEvent } from 'aws-lambda';

const main = middy(async (event: APIGatewayProxyEvent) => {
  console.log('handler v1.0.1');
  return formatJSONResponse({});
});

export default main;