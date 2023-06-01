import 'reflect-metadata';
import TYPES from 'src/TYPES';
import Couple from '../entity/Couple';
import { injectable, inject } from 'inversify';
import Repository from 'src/modules/common/domain/repository/Repository';
import PaginationQueryDTO from 'src/modules/common/domain/dto/PaginationQueryDTO';

@injectable()
export default class CoupleFindPaginatedRepository implements Repository<PaginationQueryDTO, Promise<Array<Couple>>> {
  constructor(
    @inject(TYPES.CoupleFindPaginatedRepository) private repository: Repository<PaginationQueryDTO, Promise<Array<Couple>>>
  ) {}

  execute(port?: PaginationQueryDTO): Promise<Couple[]> {
    throw new Error('Method not implemented.');
  }
}