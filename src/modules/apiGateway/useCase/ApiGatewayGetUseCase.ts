import 'reflect-metadata';
import TYPES from 'src/TYPES';
import Couple from '../domain/entity/Couple';
import { inject, injectable } from 'inversify';
import UseCase from 'src/modules/common/useCase/UseCase';
import Repository from 'src/modules/common/domain/repository/Repository';
import PaginationQueryDTO from 'src/modules/common/domain/dto/PaginationQueryDTO';
import FindManyPaginatedBaseRepositoryParams from 'src/modules/common/domain/repository/FindManyPaginatedBaseRepositoryParams';

@injectable()
export default class ApiGatewayGetUseCase implements UseCase<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryParams<Couple>>> {
  constructor(
    @inject(TYPES.CoupleFindPaginatedRepository) private coupleFindPaginatedRepository: Repository<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryParams<Couple>>>
  ) { }

  async execute(port?: PaginationQueryDTO): Promise<FindManyPaginatedBaseRepositoryParams<Couple>> {
    console.log('ApiGatewayGetUseCase execute', port);
    try {
      const items = await this.coupleFindPaginatedRepository.execute(port);
      return items;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}