import 'reflect-metadata';
import TYPES from 'src/TYPES';
import Couple from '../domain/entity/Couple';
import { inject, injectable } from 'inversify';
import Adapter from 'src/modules/common/adapter/Adapter';
import UseCase from 'src/modules/common/useCase/UseCase';
import ApiGatewayAdapterParams from './ApiGatewayPostAdapterParams';
import ApiGatewayPostUseCaseParams from '../useCase/ApiGatewayPostUseCaseParams';
import BaseMapper from 'src/modules/common/domain/mapper/BaseMapper';
import CoupleDto from '../domain/dto/CoupleDto';

@injectable()
export default class ApiGatewayAdapter implements Adapter<ApiGatewayAdapterParams, Promise<CoupleDto>> {
  constructor(
    @inject(TYPES.ApiGatewayPostUseCase) private apiGatewayPostUseCase: UseCase<ApiGatewayPostUseCaseParams, Promise<Couple>>,
    @inject(TYPES.CoupleMapper) private coupleMapper: BaseMapper<Couple, CoupleDto>
  ) {}

  async execute(port: ApiGatewayAdapterParams): Promise<CoupleDto> {
    const apiGatewayPostUseCaseParams = {
      principal: port.couple.at(0),
      companion: port.couple.at(1)
    };

    const couple = await this.apiGatewayPostUseCase.execute(apiGatewayPostUseCaseParams);
    // console.log('ApiGatewayAdapter couple', couple);
    const coupleDto = this.coupleMapper.execute(couple);
    console.log('coupleDto', coupleDto);
    return coupleDto;
  }
}