import { inject } from 'inversify';
import EntitiesAndCount from 'src/modules/common/domain/dto/EntitiesAndCount';
import FindManyPaginateBaseRepository from 'src/modules/common/domain/repository/FindManyPaginateBaseRepository';
import UseCase from 'src/modules/common/useCase/UseCase';
import TYPES from 'src/TYPES';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import Property from '../domain/entities/Property';
import PropertyGetUseCaseParams from './PropertyGetUseCaseParams';

export default class PropertyGetUseCase implements UseCase<PropertyGetUseCaseParams, Promise<EntitiesAndCount<Property>>> {

  constructor(
    @inject(TYPES.DBConnectionManagerTypeORM) private dBConnectionManager: DBConnectionManager,
    @inject(TYPES.PropertyFindRepository) private propertyFindRepository: FindManyPaginateBaseRepository<Property, Property>
  ) {}

  async execute(port: PropertyGetUseCaseParams): Promise<EntitiesAndCount<Property>> {
    await this.dBConnectionManager.connect();
    const propertiesAndCount: [Property[], number] = await this.propertyFindRepository.execute({
      pageNumber: port.page,
      size: port.size
    });

    return {
      entities: propertiesAndCount.at(0) as Property[],
      count: propertiesAndCount.at(1) as number
    }
  }
}