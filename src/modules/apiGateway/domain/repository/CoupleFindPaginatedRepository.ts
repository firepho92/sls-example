import 'reflect-metadata';
import TYPES from 'src/TYPES';
import Couple from '../entity/Couple';
import { injectable, inject } from 'inversify';
import Repository from 'src/modules/common/domain/repository/Repository';

@injectable()
export default class CoupleFindPaginatedRepository implements Repository<any, Promise<Array<Couple>>> {
  constructor(
    @inject(TYPES.CoupleFindPaginatedRepository) private repository: Repository<any, Promise<Array<Couple>>>
  ) {}

  execute(port?: any): Promise<Couple[]> {
    throw new Error('Method not implemented.');
  }
}