import 'reflect-metadata';
import TYPES from '../../../../../../src/TYPES';
import { inject, injectable } from 'inversify';
import Mapper from '../../../../../../src/modules/infrastructure/domain/mapper/Mapper';
import APIGatewayResult from '../../../../../../src/modules/infrastructure/domain/dto/APIGatewayResult';
import APIGatewayProxyEventBaseController from '../../../../../../src/modules/infrastructure/controller/APIGatewayProxyEventBaseController';
import { APIGatewayProxyEvent } from 'aws-lambda';

@injectable()
export default class ApiGatewayPostController extends APIGatewayProxyEventBaseController<string> {
  
  constructor(
    @inject(TYPES.APIGatewayResultMapperService) apiGatewayResultMapperService: Mapper<string, APIGatewayResult<string>>
  ) {
    super(apiGatewayResultMapperService);
  }

  protected validate(port: APIGatewayProxyEvent): Promise<void> {
    throw new Error('Method not implemented.');
  }
    
  protected async run(): Promise<string> {
    return 'hola';
  }
}