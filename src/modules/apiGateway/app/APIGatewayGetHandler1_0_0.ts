import 'reflect-metadata';
import TYPES from 'src/TYPES';
import Couple from '../domain/entity/Couple';
import { inject, injectable } from 'inversify';
import Adapter from 'src/modules/infrastructure/adapter/Adapter';
import Mapper from 'src/modules/infrastructure/domain/mapper/Mapper';
import { APIGatewayProxyEvent } from 'aws-lambda/trigger/api-gateway-proxy';
import APIGatewayResult from 'src/modules/infrastructure/domain/dto/APIGatewayResult';
import PaginationQueryDTO from 'src/modules/infrastructure/domain/dto/PaginationQueryDTO';
import PaginationResponseDTO from 'src/modules/infrastructure/domain/dto/PaginationResponseDTO';
import APIGatewayProxyEventBaseHandler from 'src/modules/infrastructure/app/APIGatewayProxyEventBaseHandler';

@injectable()
export default class APIGatewayGetHandler1_0_0 extends APIGatewayProxyEventBaseHandler<PaginationResponseDTO<Couple>> {
  
  constructor(
    @inject(TYPES.ApiGatewayGetAdapter) private readonly adapter: Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Couple>>>,
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<PaginationResponseDTO<Couple>, APIGatewayResult<PaginationResponseDTO<Couple>>>
  ) {
    super(apiGatewayResultMapperService);
  }

  protected async run(port?: APIGatewayProxyEvent): Promise<PaginationResponseDTO<Couple>> {
    console.log('ApiGatewayHandler1_0_0', port);
    const couplesPaginated: PaginationResponseDTO<Couple> = await this.adapter.execute(new PaginationQueryDTO({ pageNumber: port.queryStringParameters?.pageNumber, size: port.queryStringParameters?.size }));
    return couplesPaginated;
  }
}