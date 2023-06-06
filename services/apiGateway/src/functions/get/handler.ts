import 'reflect-metadata';
import middy from '@middy/core'
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import { APIGatewayProxyEvent } from 'aws-lambda';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import Couple from '../../../../../src/modules/apiGateway/domain/entity/Couple';
import PaginationQueryDTO from '../../../../../src/modules/common/domain/dto/PaginationQueryDTO';
import PaginationResponseDTO from '../../../../../src/modules/common/domain/dto/PaginationResponseDTO';
import container from './inversify.config';
import TYPES from '../../../../../src/TYPES';

export const main = middy(async (event: APIGatewayProxyEvent) => {
  const adapter: Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Couple>>> = container.get<Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Couple>>>>(TYPES.ApiGatewayGetAdapter);
  const response = await adapter.execute(new PaginationQueryDTO(1, 10));
  return formatJSONResponse({
    response,
  });
});

main
  .use(httpResponseHandlerMiddleware());