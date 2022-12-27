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

export const main = middy(async (event: any) => {
  const adapter: Adapter<ApiGatewayPostAdapterParams, Promise<ApiGatewayPostAdapterParams>> = container.get<Adapter<ApiGatewayPostAdapterParams, Promise<ApiGatewayPostAdapterParams>>>(TYPES.ApiGatewayAdapter);
  const response: ApiGatewayPostAdapterParams = await adapter.execute(event.body);
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