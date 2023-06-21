import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import CoupleDto from '../domain/dto/CoupleDto';
import Adapter from 'src/modules/infrastructure/adapter/Adapter';
import formatJSONResponse from 'src/utils/response/formatJSONResponse';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import ApiGatewayPostAdapterParams from '../adapter/ApiGatewayPostAdapterParams';
import APIGatewayProxyEventBaseHandler from 'src/modules/infrastructure/app/APIGatewayProxyEventBaseHandler';

@injectable()
export default class ApiGatewayHandler1_0_0 extends APIGatewayProxyEventBaseHandler<Promise<CoupleDto>> {
  
  constructor(
    @inject(TYPES.ApiGatewayPostAdapter) private readonly adapter: Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>
  ) {
    super();
  }

  protected async buildExecution(port?: APIGatewayProxyEvent): Promise<CoupleDto> {
    console.log('ApiGatewayHandler1_0_0');
    // console.log('body', port.body);
    const data: CoupleDto = await this.adapter.execute(port.body as unknown as ApiGatewayPostAdapterParams);
    
    return formatJSONResponse(data);
  }
}