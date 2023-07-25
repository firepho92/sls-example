import 'reflect-metadata';
import TYPES from 'src/TYPES';
import { inject, injectable } from 'inversify';
import Mapper from 'src/modules/infrastructure/domain/mapper/Mapper';
import APIGatewayResult from 'src/modules/infrastructure/domain/dto/APIGatewayResult';
import APIGatewayProxyEventBaseHandler from 'src/modules/infrastructure/app/APIGatewayProxyEventBaseHandler';

@injectable()
export default class ApiGatewayHandler extends APIGatewayProxyEventBaseHandler<string> {
  
  constructor(
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<string, APIGatewayResult<string>>
    ) {
      super(apiGatewayResultMapperService);
    }
    
  protected async run(): Promise<string> {
    return 'hola';
  }
}