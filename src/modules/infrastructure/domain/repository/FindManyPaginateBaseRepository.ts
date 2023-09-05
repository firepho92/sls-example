/* eslint-disable @typescript-eslint/no-explicit-any */
import 'reflect-metadata';
import { injectable } from 'inversify';
import { SelectQueryBuilder } from 'typeorm';
import Warning from '../../../../utils/error/Warning';
import ErrorCode from '../../../../utils/error/errorCode';
import Exception from '../../../../utils/error/Exception';
import HttpStatusCode from '../../../../utils/enums/httpStatusCode';
import PostgresSQLErrorCodes from '../../../../utils/enums/postgresSQLErrorCodes';
import Repository from './Repository';
import PaginationQueryDTO from '../dto/PaginationQueryDTO';
import FindManyPaginatedBaseRepositoryParams from './FindManyPaginatedBaseRepositoryParams';
import EnvironmentHelper, { ApplicationMode } from 'src/utils/helpers/EnvironmentHelper';
import QueryExecutionPlan from './QueryExecutionPlan';

/**
 * @class FindManyPaginateBaseRepository
 * @template T
 * @implements Repository<T>
 * @description class to findmany items and paginate them
 * @author Daniel Campos
 * @created 2022-07-27
 * @updated 2022-10-21
 * @updatedBy Alexandro Aguilar
 */
@injectable()
export default abstract class FindManyPaginateBaseRepository<T> implements Repository<PaginationQueryDTO, Promise<FindManyPaginatedBaseRepositoryParams<T>>> {

  protected abstract buildQuery(port?: PaginationQueryDTO): Promise<SelectQueryBuilder<T>>;
  /**
   * @function execute
   * @param {PaginationQueryDTO} port
   * @returns Promise<T[], number>
   * @throws {Exception | Warning}
   * @description Finds all items paginated
   * @belongsTo Repository
   */
  public async execute(port?: PaginationQueryDTO): Promise<FindManyPaginatedBaseRepositoryParams<T>> {
    console.log('FindManyPaginateBaseRepository execute port', port);
    try {
      const query = await this.buildQuery(port) as SelectQueryBuilder<T>;
      query.skip((port.pageNumber - 1) * port.size).take(port.size);
      EnvironmentHelper.MODE === ApplicationMode.LOCAL && console.log('Execution plan', await QueryExecutionPlan.execute(query, query.connection));
      const result = await query.getManyAndCount();
      const response = new FindManyPaginatedBaseRepositoryParams<T>(result[0], result[1]);
      console.log('FindManyPaginateBaseRepository execute response', response);
      return response;
    } catch (error) {
      console.error(error);
      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.ERR0008);

      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }
}