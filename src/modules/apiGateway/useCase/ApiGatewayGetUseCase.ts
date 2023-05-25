import 'reflect-metadata';
import { injectable } from 'inversify';
import Couple from '../domain/entity/Couple';
import UseCase from 'src/modules/common/useCase/UseCase';
import PaginationQueryDTO from 'src/modules/common/domain/dto/PaginationQueryDTO';

@injectable()
export default class ApiGatewayGetUseCase implements UseCase<PaginationQueryDTO, Promise<{items: Couple[], count: number}>> {

  async execute(port?: PaginationQueryDTO): Promise<{items: Couple[], count: number}> {
    return { items: [], count: 0 }
  }
}