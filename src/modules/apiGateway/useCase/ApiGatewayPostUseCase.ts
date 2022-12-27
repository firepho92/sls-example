import 'reflect-metadata';
import TYPES from 'src/TYPES';
import Couple from '../domain/entity/Couple';
import Person from '../domain/entity/Person';
import { inject, injectable } from 'inversify';
import UseCase from 'src/modules/common/useCase/UseCase';
import ApiGatewayPostUseCaseParams from './ApiGatewayPostUseCaseParams';
import CreateBaseRepository from 'src/modules/common/domain/repository/CreateBaseRepository';

@injectable()
export default class ApiGatewayPostUseCase implements UseCase<ApiGatewayPostUseCaseParams, Promise<Couple>> {

  constructor(
    @inject(TYPES.CoupleCreateOneRepository) private coupleCreateOneRepository: CreateBaseRepository<Couple>,
    @inject(TYPES.PersonCreateOneRepository) private personCreateOneRepository: CreateBaseRepository<Person>
  ) {}

  async execute(port: ApiGatewayPostUseCaseParams): Promise<Couple> {
    const principal = await this.personCreateOneRepository.execute(new Person(port.principal));
    const companion = await this.personCreateOneRepository.execute(new Person(port.companion));

    const couple = await this.coupleCreateOneRepository.execute(new Couple(principal, companion));

    return couple;
  }
}