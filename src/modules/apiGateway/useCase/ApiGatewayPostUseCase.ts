import 'reflect-metadata';
import { injectable } from 'inversify';
import UseCase from 'src/modules/common/useCase/UseCase';
import Couple from '../domain/entity/Couple';
import Person from '../domain/entity/Person';
import ApiGatewayPostUseCaseParams from './ApiGatewayPostUseCaseParams';

@injectable()
export default class ApiGatewayPostUseCase implements UseCase<ApiGatewayPostUseCaseParams, Promise<Couple>> {
  async execute(port: ApiGatewayPostUseCaseParams): Promise<Couple> {
    const principal = new Person(port.principal);
    const companion = new Person(port.companion);

    const couple = new Couple(principal, companion);

    return couple;
  }
}