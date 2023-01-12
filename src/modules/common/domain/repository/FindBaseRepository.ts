import 'reflect-metadata';
import { injectable, unmanaged } from 'inversify';
import { DataSource, SelectQueryBuilder } from 'typeorm';
import DBConnectionManager from '../../../../shared/database/DBConnectionManager';
//import Log from '../../../../../shared/utils/logger/implementation/Log';
import Warning from '../../../../shared/error/Warning';
import ErrorCode from '../../../../shared/error/ErrorCode';
import Exception from '../../../../shared/error/Exception';
import HttpStatusCode from '../../../../shared/enums/HttpStatusCode';
import PostgresSQLErrorCodes from '../../../../shared/enums/PostgresSQLErrorCodes';

export type ObjectType<T> = { new(): T } | Function; // eslint-disable-line

/**
 * @absract class FindBaseRepository
 * @param {ObjectType<T>} type
 * @param {DBConnectionManager} iDBConnectionManager
 * @template T
 * @implements FindBaseRepository<T>
 * @description Base repository class
 * @author Raul Dominguez
 * @created 2022-07-18
 * @updated 2022-07-18
 * @updatedBy Raul Dominguez
 */
@injectable()
export default abstract class FindBaseRepository<T> {
  // private type: ObjectType<T>;
  // private iDBConnectionManager: DBConnectionManager;

  // constructor(@unmanaged() type: ObjectType<T>, @unmanaged() iDBConnectionManager: DBConnectionManager) {
  //   this.iDBConnectionManager = iDBConnectionManager;
  //   this.type = type;
  // }
  protected abstract buildQuery(port?: T): Promise<SelectQueryBuilder<T>>;

  /**
   * @function execute
   * @returns Promise<T[]>
   * @throws {Error}
   * @description Finds all items
   * @belongsTo FindBaseRepository
   */
  //@Log()
  public async execute(): Promise<T[]> {
    //Connect to the database
    try {
      const query = await this.buildQuery() as SelectQueryBuilder<T>;
      const entities: T[] = await query.getMany();
      return entities;
      // console.log('🚀 ~ file: FindBaseRepository.ts ~ line 46 ~ execute ~ start');
      // const connection: DataSource = await this.iDBConnectionManager.connect();
      // //Build up the query
      // const query: SelectQueryBuilder<T> = connection.manager.createQueryBuilder(this.type, 'entity');
      // //Execute the query
      // const entities: T[] = await query.getMany();
      // console.log('🚀 ~ file: FindBaseRepository.ts ~ line 52 ~ execute ~ end');
      // return entities;
    } catch (error) {
      console.log('🚀 ~ file: FindBaseRepository.ts ~ line 55 ~ execute ~ error', error);
      if (error.code === PostgresSQLErrorCodes.FOREIGN_KEY_VIOLATION)
        throw new Warning(HttpStatusCode.NOT_FOUND, [], ErrorCode.ERR0001);
      if (error.code === PostgresSQLErrorCodes.INVALID_TEXT_REPRESENTATI)
        throw new Warning(HttpStatusCode.BAD_REQUEST, [], ErrorCode.ERR0008);

      throw new Exception(HttpStatusCode.INTERNAL_SERVER_ERROR, ErrorCode.ERR0000, []);
    }
  }
}