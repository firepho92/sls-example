import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { DataSource, QueryRunner } from 'typeorm';
import DBConnectionManager from '../../../../shared/database/DBConnectionManager';
//import Log from '../../../../shared/utils/logger/implementation/Log';
import DBConnectionManagerTypeORM from '../../../../shared/database/DBConnectionManagerTypeORM';
import  TYPES  from '../../../../types';
import Warning from '../../../../shared/error/Warning';
import ErrorCode from '../../../../shared/error/ErrorCode';
import Exception from '../../../../shared/error/Exception';
import HttpStatusCode from '../../../../shared/enums/HttpStatusCode';
import PostgresSQLErrorCodes from '../../../../shared/enums/PostgresSQLErrorCodes';

/**
 * @absract class SoftDeleteOneBaseRepository
 * @param {DBConnectionManager} iDBConnectionManager
 * @template T
 * @implements ISoftDeleteOneBaseRepository<T>
 * @description Base repository class
 * @author Daniel Campos
 * @created 2022-08-01
 * @updated 2022-08-01
 * @updatedBy Daniel Campos
 */
@injectable()
export default class SoftDeleteOneBaseRepository<T> {
  protected iDBConnectionManager: DBConnectionManager;

  constructor(@inject(TYPES.DBConnectionManagerTypeORM) iDBConnectionManager: DBConnectionManagerTypeORM) {
    this.iDBConnectionManager = iDBConnectionManager;
  }

  /**
   * @function execute
   * @param {T} item
   * @returns Promise<T>
   * @throws {Error}
   * @description Soft Deletes an item
   * @belongsTo ISoftDeleteOneBaseRepository
   */
  //@Log()
  public async execute(id: string | number, entityClass: { new (): T }, softDeleteColumn?: string): Promise<boolean> {
    try {
      //Connect to the database
      const connection: DataSource | QueryRunner = await this.iDBConnectionManager.getActiveConnection();
      const updateResult = await connection.manager
        .createQueryBuilder()
        .update(entityClass)
        .set({ [`${softDeleteColumn ?? 'active'}`]: false } as any as T) // eslint-disable-line
        .where('id = :id', { id })
        .execute();
      if (updateResult.affected === 0) throw new Error('Entity not found');
      return true;
    } catch (error) {
      console.log(error);
      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.ERR0008);

      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }
}