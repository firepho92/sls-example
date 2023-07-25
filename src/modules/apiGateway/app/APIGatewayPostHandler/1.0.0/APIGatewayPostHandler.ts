import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import CoupleDto from '../../../domain/dto/CoupleDto';
import Adapter from 'src/modules/infrastructure/adapter/Adapter';
import Mapper from 'src/modules/infrastructure/domain/mapper/Mapper';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import ApiGatewayPostAdapterParams from '../../../adapter/ApiGatewayPostAdapterParams';
import APIGatewayResult from 'src/modules/infrastructure/domain/dto/APIGatewayResult';
import APIGatewayProxyEventBaseHandler from 'src/modules/infrastructure/app/APIGatewayProxyEventBaseHandler';

@injectable()
export default class ApiGatewayHandler extends APIGatewayProxyEventBaseHandler<CoupleDto> {
  
  constructor(
    @inject(TYPES.ApiGatewayPostAdapter) private readonly adapter: Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>,
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<CoupleDto, APIGatewayResult<CoupleDto>>
  ) {
    super(apiGatewayResultMapperService);
  }

  protected async run(port?: APIGatewayProxyEvent): Promise<CoupleDto> {
    console.log('ApiGatewayHandler1_0_0');
    // console.log('body', port.body);
    const coupleDto: CoupleDto = await this.adapter.execute(port.body as unknown as ApiGatewayPostAdapterParams);
    return coupleDto;
  }
}