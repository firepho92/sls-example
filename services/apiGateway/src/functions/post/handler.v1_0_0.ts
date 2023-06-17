import 'reflect-metadata';
import middy from '@middy/core';
import container from './inversify.config';
import TYPES from '../../../../../src/TYPES';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import ApiGatewayPostAdapterParams from '../../../../../src/modules/apiGateway/adapter/ApiGatewayPostAdapterParams';
import CoupleDto from '../../../../../src/modules/apiGateway/domain/dto/CoupleDto';
import { APIGatewayProxyEvent } from 'aws-lambda';

const main = middy(async (event: APIGatewayProxyEvent) => {
  console.log('handler');
  const adapter: Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>> = container.get<Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>>(TYPES.ApiGatewayPostAdapter);
  // console.log('body', event.body);
  const data: CoupleDto = await adapter.execute(event.body as unknown as ApiGatewayPostAdapterParams);
  return formatJSONResponse(data);
});

export default main;