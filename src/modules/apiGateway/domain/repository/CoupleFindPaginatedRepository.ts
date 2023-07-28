import 'reflect-metadata';
import TYPES from '../../../../../src/TYPES';
import Couple from '../entity/Couple';
import { injectable, inject } from 'inversify';
import PaginationQueryDTO from '../../../../../src/modules/infrastructure/domain/dto/PaginationQueryDTO';
import FindManyPaginateBaseRepository from '../../../../../src/modules/infrastructure/domain/repository/FindManyPaginateBaseRepository';
import { DataSource, QueryRunner, SelectQueryBuilder } from 'typeorm';
import DBConnectionManager from '../../../../../src/utils/database/DBConnectionManager';

@injectable()
export default class CoupleFindPaginatedRepository extends FindManyPaginateBaseRepository<Couple> {
  constructor(
    @inject(TYPES.DBConnectionManager) private dbConnectionManager: DBConnectionManager
    ) {
      super();
    }
    
    protected async buildQuery(port?: PaginationQueryDTO): Promise<SelectQueryBuilder<Couple>> {
      // console.log('CoupleFindPaginatedRepository buildQuery', port);
      const connection: DataSource | QueryRunner = await this.dbConnectionManager.getActiveConnection();
      const queryBuilder = connection.manager.createQueryBuilder()
        .select('couple')
        .from(Couple, 'couple')
        .leftJoinAndSelect('couple.principal', 'principal')
        .leftJoinAndSelect('couple.companion', 'companion')
        .where('principal.active = :active', { active: true });
        if (port.order)
          queryBuilder.orderBy(`couple.${port.order.field}`, port.order.direction);
      return queryBuilder;
    }
}