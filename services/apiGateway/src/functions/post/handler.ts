import 'reflect-metadata';
import schema from './schema';
import middy from '@middy/core';
import container from './inversify.config';
import TYPES from '../../../../../src/TYPES';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import ApiGatewayPostAdapterParams from '../../../../../src/modules/apiGateway/adapter/ApiGatewayPostAdapterParams';
import httpJoiValidatorMiddleware, { VALIDATOR_TYPE } from '../../../../../src/middleware/httpJoiValidatorMiddleware';
import CoupleDto from '../../../../../src/modules/apiGateway/domain/dto/CoupleDto';
import { APIGatewayProxyEvent } from 'aws-lambda';

export const main = middy(async (event: APIGatewayProxyEvent) => {
  // console.log('env', process.env);
  const adapter: Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>> = container.get<Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>>(TYPES.ApiGatewayPostAdapter);
  // console.log('body', event.body);
  const data: CoupleDto = await adapter.execute(event.body as unknown as ApiGatewayPostAdapterParams);
  return formatJSONResponse(data);
});

main
  .use(httpJsonBodyParser())
  .use(httpJoiValidatorMiddleware({
    schema,
    type: VALIDATOR_TYPE.BODY,
  }))
  .use(httpResponseHandlerMiddleware());