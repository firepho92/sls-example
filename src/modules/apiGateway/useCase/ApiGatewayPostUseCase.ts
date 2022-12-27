import { injectable } from 'inversify';
import 'reflect-metadata';
import UseCase from 'src/modules/common/useCase/UseCase';
import ApiGatewayPostUseCaseParams from './ApiGatewayPostUseCaseParams';

@injectable()
export default class ApiGatewayPostUseCase implements UseCase<ApiGatewayPostUseCaseParams, Promise<Couple>> {
  execute(port: ApiGatewayPostUseCaseParams): Promise<Couple> {
    
  }
}