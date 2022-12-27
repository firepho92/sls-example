import 'reflect-metadata';
import schema from './schema';
import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import ApiGatewayAdapterParams from '../../../../../src/modules/apiGateway/adapter/ApiGatewayAdapterParams';
import httpJoiValidatorMiddleware, { VALIDATOR_TYPE } from '../../../../../src/middleware/httpJoiValidatorMiddleware';
import container from './inversify.config';
import TYPES from '../../../../../src/TYPES';

export const main = middy(async (event: any) => {
  const adapter: Adapter<ApiGatewayAdapterParams, Promise<ApiGatewayAdapterParams>> = container.get<Adapter<ApiGatewayAdapterParams, Promise<ApiGatewayAdapterParams>>>(TYPES.ApiGatewayAdapter);
  const response: ApiGatewayAdapterParams = await adapter.execute(event.body);
  return formatJSONResponse({
    response
  });
});

main
  .use(httpJsonBodyParser())
  .use(httpJoiValidatorMiddleware({
    schema,
    type: VALIDATOR_TYPE.BODY,
  }))
  .use(httpResponseHandlerMiddleware());