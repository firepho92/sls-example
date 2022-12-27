import { injectable } from 'inversify';
import Mapper from './Mapper';

/**
 * @abstract @class MapperService
 * @implements {Mapper<S, T>}
 * @template S
 * @template T
 * @description Abstract class that defines the methods that a mapper service must implement
 */

@injectable()
export default abstract class BaseMapper<S, T> implements Mapper<S, T> {
  protected abstract execute(entity: S): T;

  transform(entity: S): T;
  transform(array: S[]): T[];
  transform(entityOrArray: S | S[]): T | T[] {
    return Array.isArray(entityOrArray) ? entityOrArray.map((item: S) => this.execute(item)) : this.execute(entityOrArray);
  }
}
