import 'reflect-metadata'
import { inject, injectable } from 'inversify';
import FindManyPaginateBaseRepository from 'src/modules/common/domain/repository/FindManyPaginateBaseRepository';
import TYPES from 'src/TYPES';
import DBConnectionManager from 'src/utils/database/DBConnectionManager';
import HttpStatusCode from 'src/utils/enums/httpStatusCode';
import ErrorCode from 'src/utils/error/errorCode';
import Exception from 'src/utils/error/Exception';
import { SelectQueryBuilder } from 'typeorm';
import Property from '../entities/Property';

@injectable()
export default class PropertyFindRepository extends FindManyPaginateBaseRepository<Property, any> {

  constructor(@inject(TYPES.DBConnectionManagerTypeORM) private dBConnectionManagerTypeORM: DBConnectionManager) {
    super();
  }

  protected async buildQuery(port?: Property): Promise<SelectQueryBuilder<Property>> {
    try {
      const connection = await this.dBConnectionManagerTypeORM.getActiveConnection();
      const queryBuilder = connection.manager
        .getRepository(Property)
        .createQueryBuilder('property')
        
        if (port)
          queryBuilder.where('property.name = :port', { port });

      return queryBuilder;
    } catch (error) {
      console.error('ERR', error);
      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }
}