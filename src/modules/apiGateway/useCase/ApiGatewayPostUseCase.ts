import 'reflect-metadata';
import TYPES from 'src/TYPES';
import Couple from '../domain/entity/Couple';
import Person from '../domain/entity/Person';
import { inject, injectable } from 'inversify';
import UseCase from 'src/modules/common/useCase/UseCase';
import ApiGatewayPostUseCaseParams from './ApiGatewayPostUseCaseParams';
import CreateBaseRepository from 'src/modules/common/domain/repository/CreateBaseRepository';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';

@injectable()
export default class ApiGatewayPostUseCase implements UseCase<ApiGatewayPostUseCaseParams, Promise<Couple>> {

  constructor(
    @inject(TYPES.CoupleCreateOneRepository) private coupleCreateOneRepository: CreateBaseRepository<Partial<Couple>>,
    @inject(TYPES.PersonCreateOneRepository) private personCreateOneRepository: CreateBaseRepository<Person>,
    @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager
  ) {}

  async execute(port: ApiGatewayPostUseCaseParams): Promise<Couple> {
    await this.dbConnectionManager.getActiveConnection();
    try {
      // console.log('ApiGatewayPostUseCase port', port);
      const principal = await this.personCreateOneRepository.execute(new Person(port.principal.name, port.principal.age));
      const companion = await this.personCreateOneRepository.execute(new Person(port.companion.name, port.companion.age));
      // console.log('principal', principal);
      // console.log('companion', companion);

      const couple: Couple = await this.coupleCreateOneRepository.execute({principal, companion}) as Couple;
      console.log('couple', couple);
      return couple;
    } catch (error) {
      console.log('ApiGatewayPostUseCase error', error);
    } finally {
      await this.dbConnectionManager.disconnect();
    }
  }
}