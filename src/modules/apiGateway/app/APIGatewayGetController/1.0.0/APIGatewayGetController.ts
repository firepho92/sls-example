import 'reflect-metadata';
import TYPES from '../../../../../../src/TYPES';
import { inject, injectable } from 'inversify';
import Couple from '../../../domain/entity/Couple';
import Adapter from '../../../../../../src/modules/infrastructure/adapter/Adapter';
import Mapper from '../../../../../../src/modules/infrastructure/domain/mapper/Mapper';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import APIGatewayResult from '../../../../../../src/modules/infrastructure/domain/dto/APIGatewayResult';
import PaginationQueryDTO from '../../../../../../src/modules/infrastructure/domain/dto/PaginationQueryDTO';
import PaginationResponseDTO from '../../../../../../src/modules/infrastructure/domain/dto/PaginationResponseDTO';
import APIGatewayProxyEventBaseController from '../../../../../../src/modules/infrastructure/controller/APIGatewayProxyEventBaseController';

@injectable()
export default class APIGatewayGetHandler extends APIGatewayProxyEventBaseController<PaginationResponseDTO<Couple>> {
  
  constructor(
    @inject(TYPES.ApiGatewayGetAdapter) private readonly adapter: Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Couple>>>,
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<PaginationResponseDTO<Couple>, APIGatewayResult<PaginationResponseDTO<Couple>>>
    ) {
      super(apiGatewayResultMapperService);
    }
    
  protected validate(port: APIGatewayProxyEvent): Promise<void> {
    console.log(port);
    throw new Error('Method not implemented.');
  }

  protected async run(port?: APIGatewayProxyEvent): Promise<PaginationResponseDTO<Couple>> {
    console.log('ApiGatewayHandler1_0_0', port);
    const couplesPaginated: PaginationResponseDTO<Couple> = await this.adapter.execute(new PaginationQueryDTO({ pageNumber: port.queryStringParameters?.pageNumber, size: port.queryStringParameters?.size }));
    return couplesPaginated;
  }
}