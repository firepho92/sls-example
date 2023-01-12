import 'reflect-metadata';
import middy from '@middy/core'
import formatJSONResponse from '../../../../../src/utils/response/formatJSONResponse';
import httpResponseHandlerMiddleware from '../../../../../src/middleware/httpResponseHandlerMiddleware';
import container from './inversify.config';
import TYPES from 'src/TYPES';
import Adapter from 'src/modules/common/adapter/Adapter';
import PropertyGetAdapterParams from 'src/modules/property/adapter/PropertyGetAdapterParams';
import Property from 'src/modules/property/domain/entities/Property';

export const main = middy(async (event: any) => {
  const adapter = container.get<Adapter<PropertyGetAdapterParams, Promise<Array<Property>>>>(TYPES.PropertyGetAdapter);
  const response: object = adapter.execute(event);
  return formatJSONResponse(response);
});

main
  .use(httpResponseHandlerMiddleware());