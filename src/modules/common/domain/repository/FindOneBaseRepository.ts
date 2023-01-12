import 'reflect-metadata';
import { injectable } from 'inversify';
import { EntityNotFoundError, SelectQueryBuilder } from 'typeorm';
import Warning from '../../../../shared/error/Warning';
import ErrorCode from '../../../../shared/error/ErrorCode';
import Exception from '../../../../shared/error/Exception';
import HttpStatusCode from '../../../../shared/enums/HttpStatusCode';
import PostgresSQLErrorCodes from '../../../../shared/enums/PostgresSQLErrorCodes';
import Repository from './Repository';

//const logger = LoggerFactory.getInstance();

/**
 * @class FindOneBaseRepository
 * @template T
 * @implements Repository<T, Promise<U>>
 * @description Base repository class
 * @author Daniel Campos
 * @created 2022-07-27
 * @updated 2022-10-14
 * @updatedBy Alexandro Aguilar
 */
@injectable()
export default abstract class FindOneBaseRepository<T, U> implements Repository<T, U> {

  protected abstract buildQuery(port?: T): Promise<SelectQueryBuilder<U>>;
  /**
   * @function execute
   * @returns Promise<T[], number>
   * @throws {Exception | Warning}
   * @description Finds all items paginated
   * @belongsTo Repository
   */
  async execute(port?: T): Promise<U> {
    try {
      const query = await this.buildQuery(port) as SelectQueryBuilder<U>;
      const result = await query.getOneOrFail();
      //logger.log(`🚀  ~ Returns - `, JSON.stringify(result));
      return result;
    } catch (error) {
      console.log(error);
      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.ERR0008);
      if (error instanceof EntityNotFoundError) throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);

      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }
}