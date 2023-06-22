import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import APIGatewayProxyEventBaseHandler from 'src/modules/infrastructure/app/APIGatewayProxyEventBaseHandler';
import Mapper from 'src/modules/infrastructure/domain/mapper/Mapper';
import APIGatewayResult from 'src/modules/infrastructure/domain/dto/APIGatewayResult';

@injectable()
export default class ApiGatewayHandler1_0_1 extends APIGatewayProxyEventBaseHandler<string> {
  
  constructor(
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<string, APIGatewayResult<string>>
    ) {
      super(apiGatewayResultMapperService);
    }
    
  protected async run(): Promise<string> {
    return 'hola';
  }
}