import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import CoupleDto from '../domain/dto/CoupleDto';
import Adapter from 'src/modules/common/adapter/Adapter';
import formatJSONResponse from 'src/utils/response/formatJSONResponse';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import ApiGatewayPostAdapterParams from '../adapter/ApiGatewayPostAdapterParams';
import Handler from 'src/modules/common/app/Handler';

@injectable()
export default class ApiGatewayHandler1_0_1 implements Handler<Promise<any>> {

  constructor(
    @inject(TYPES.ApiGatewayPostAdapter) private adapter: Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>
  ) {}

  async execute(port: APIGatewayProxyEvent): Promise<any> {
    console.log('ApiGatewayHandler1_0_1');
    // console.log('body', port.body);
    return formatJSONResponse('hola');
  }
}