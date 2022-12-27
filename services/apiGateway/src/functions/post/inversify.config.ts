import { Container } from 'inversify';
import TYPES from '../../../../../src/TYPES';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import UseCase from '../../../../../src/modules/common/useCase/UseCase';
import ApiGatewayPostAdapter from '../../../../../src/modules/apiGateway/adapter/ApiGatewayPostAdapter';
import ApiGatewayPostUseCase from '../../../../../src/modules/apiGateway/useCase/ApiGatewayPostUseCase';
import ApiGatewayPostAdapterParams from '../../../../../src/modules/apiGateway/adapter/ApiGatewayPostAdapterParams';
import ApiGatewayPostUseCaseParams from '../../../../../src/modules/apiGateway/useCase/ApiGatewayPostUseCaseParams';
import Couple from '../../../../../src/modules/apiGateway/domain/entity/Couple';
import CoupleDto from '../../../../../src/modules/apiGateway/domain/dto/CoupleDto';
import BaseMapper from '../../../../../src/modules/common/domain/mapper/BaseMapper';
import CoupleMapper from '../../../../../src/modules/apiGateway/domain/mapper/CoupleMapper';

const container: Container = new Container();

container.bind<Adapter<ApiGatewayPostAdapterParams, Promise<Couple>>>(TYPES.ApiGatewayPostAdapter).to(ApiGatewayPostAdapter);
container.bind<UseCase<ApiGatewayPostUseCaseParams, Promise<ApiGatewayPostUseCaseParams>>>(TYPES.ApiGatewayPostUseCase).to(ApiGatewayPostUseCase);
container.bind<BaseMapper<Couple, CoupleDto>>(TYPES.CoupleMapper).to(CoupleMapper);

export default container;