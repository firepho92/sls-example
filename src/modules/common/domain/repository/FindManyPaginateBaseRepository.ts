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

/**
 * @class FindManyPaginateBaseRepository
 * @template T, U
 * @implements Repository<T, U>
 * @description class to findmany items and paginate them
 * @author Daniel Campos
 * @created 2022-07-27
 * @updated 2022-10-21
 * @updatedBy Alexandro Aguilar
 */
@injectable()
export default abstract class FindManyPaginateBaseRepository<T, U> implements Repository<PaginationQueryDTO<T>, Promise<[U[], number]>> {

  protected abstract buildQuery(port?: T): Promise<SelectQueryBuilder<U>>;
  /**
   * @function execute
   * @returns Promise<T[], number>
   * @throws {Exception | Warning}
   * @description Finds all items paginated
   * @belongsTo Repository
   */
  async execute(port?: PaginationQueryDTO<T>): Promise<[U[], number]> {
    try {
      const query = await this.buildQuery(port.criteria) as SelectQueryBuilder<U>;
      query.skip((port.pageNumber - 1) * port.size).take(port.size);
      const result = await query.getManyAndCount();

      return result;
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