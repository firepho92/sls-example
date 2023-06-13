import { Container } from 'inversify';
import TYPES from '../../../../../src/TYPES';
import ApiGatewayGetAdapter from '../../../../../src/modules/apiGateway/adapter/ApiGatewayGetAdapter';
import CoupleMapper from '../../../../../src/modules/apiGateway/domain/mapper/CoupleMapper';
import ApiGatewayGetUseCase from '../../../../../src/modules/apiGateway/useCase/ApiGatewayGetUseCase';
import DBConnectionManagerTypeORM from '../../../../../src/utils/database/DBConnectionManagerTypeORM';
import PaginationMapperService from '../../../../../src/modules/common/domain/mapper/PaginationMapperService';
import CoupleFindPaginatedRepository from '../../../../../src/modules/apiGateway/domain/repository/CoupleFindPaginatedRepository';

const container: Container = new Container();

container.bind(TYPES.DBConnectionManager).to(DBConnectionManagerTypeORM).inSingletonScope();
container.bind(TYPES.CoupleMapper).to(CoupleMapper);
container.bind(TYPES.PaginationMapperService).to(PaginationMapperService);
container.bind(TYPES.ApiGatewayGetAdapter).to(ApiGatewayGetAdapter);
container.bind(TYPES.ApiGatewayGetUseCase).to(ApiGatewayGetUseCase);
container.bind(TYPES.CoupleFindPaginatedRepository).to(CoupleFindPaginatedRepository);

export default container