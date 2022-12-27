import 'reflect-metadata';
import TYPES from 'src/TYPES';
import Couple from '../domain/entity/Couple';
import { inject, injectable } from 'inversify';
import Adapter from 'src/modules/common/adapter/Adapter';
import UseCase from 'src/modules/common/useCase/UseCase';
import ApiGatewayAdapterParams from './ApiGatewayPostAdapterParams';
import ApiGatewayPostUseCaseParams from '../useCase/ApiGatewayPostUseCaseParams';

@injectable()
export default class ApiGatewayAdapter implements Adapter<ApiGatewayAdapterParams, Promise<Couple>> {

  constructor(
    @inject(TYPES.ApiGatewayPostUseCase) private apiGatewayPostUseCase: UseCase<ApiGatewayPostUseCaseParams, Promise<Couple>>
  ) {}

  async execute(port?: ApiGatewayAdapterParams): Promise<Couple> {
    const apiGatewayPostUseCaseParams = {
      principal: port.couple.at(0),
      companion: port.couple.at(1)
    };

    const couple = await this.apiGatewayPostUseCase.execute(apiGatewayPostUseCaseParams);

    return couple;
  }
}