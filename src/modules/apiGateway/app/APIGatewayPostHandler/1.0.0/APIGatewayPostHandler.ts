import 'reflect-metadata';
import TYPES from 'src/TYPES';
import schema from './schema';
import { inject, injectable } from 'inversify';
import CoupleDto from '../../../domain/dto/CoupleDto';
import Adapter from 'src/modules/infrastructure/adapter/Adapter';
import Mapper from 'src/modules/infrastructure/domain/mapper/Mapper';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import { VALIDATOR_TYPE } from 'src/middleware/httpJoiValidatorMiddleware';
import APIGatewayResult from 'src/modules/infrastructure/domain/dto/APIGatewayResult';
import ApiGatewayPostAdapterParams from '../../../adapter/ApiGatewayPostAdapterParams';
import APIGatewayProxyEventBaseHandler from 'src/modules/infrastructure/app/APIGatewayProxyEventBaseHandler';
import Validator from 'src/utils/request/Validator';

@injectable()
export default class ApiGatewayHandler extends APIGatewayProxyEventBaseHandler<CoupleDto> {
  
  constructor(
    @inject(TYPES.ApiGatewayPostAdapter) private readonly adapter: Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>,
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<CoupleDto, APIGatewayResult<CoupleDto>>
    ) {
      super(apiGatewayResultMapperService);
    }
    
  protected async validate(port: APIGatewayProxyEvent): Promise<void> {
    const validator = new Validator({
      schema,
      event: port,
      type: VALIDATOR_TYPE.BODY
    });
    await validator.execute();
  }

  protected async run(port?: APIGatewayProxyEvent): Promise<CoupleDto> {
    console.log('ApiGatewayHandler1_0_0');
    
    const coupleDto: CoupleDto = await this.adapter.execute(port.body as unknown as ApiGatewayPostAdapterParams);
    return coupleDto;
  }
}