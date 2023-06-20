import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import CoupleDto from '../domain/dto/CoupleDto';
import Handler from 'src/modules/common/app/Handler';
import Adapter from 'src/modules/common/adapter/Adapter';
import formatJSONResponse from 'src/utils/response/formatJSONResponse';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import ApiGatewayPostAdapterParams from '../adapter/ApiGatewayPostAdapterParams';

@injectable()
export default class ApiGatewayHandler1_0_0 implements Handler<any> {

  constructor(
    @inject(TYPES.ApiGatewayPostAdapter) private adapter: Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>
  ) {}

  async execute(port: APIGatewayProxyEvent): Promise<any> {
    console.log('ApiGatewayHandler1_0_0');
    // console.log('body', port.body);
    const data: CoupleDto = await this.adapter.execute(port.body as unknown as ApiGatewayPostAdapterParams);
    return formatJSONResponse(data);
  }
}