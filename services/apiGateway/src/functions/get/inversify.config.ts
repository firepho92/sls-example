import { Container } from 'inversify';
import TYPES from '../../../../../src/TYPES';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import UseCase from '../../../../../src/modules/common/useCase/UseCase';
import Couple from '../../../../../src/modules/apiGateway/domain/entity/Couple';
import DBConnectionManager from '../../../../../src/utils/database/DBConnectionManager';
import PaginationQueryDTO from '../../../../../src/modules/common/domain/dto/PaginationQueryDTO';
import ApiGatewayGetAdapter from '../../../../../src/modules/apiGateway/adapter/ApiGatewayGetAdapter';
import ApiGatewayGetUseCase from '../../../../../src/modules/apiGateway/useCase/ApiGatewayGetUseCase';
import DBConnectionManagerTypeORM from '../../../../../src/utils/database/DBConnectionManagerTypeORM';
import PaginationResponseDTO from '../../../../../src/modules/common/domain/dto/PaginationResponseDTO';
import CoupleDto from '../../../../../src/modules/apiGateway/domain/dto/CoupleDto';
import BaseMapper from '../../../../../src/modules/common/domain/mapper/BaseMapper';
import CoupleMapper from '../../../../../src/modules/apiGateway/domain/mapper/CoupleMapper';
import PaginationMapperParams from '../../../../../src/modules/common/domain/dto/PaginationMapperParams';
import PaginationMapperService from '../../../../../src/modules/common/domain/mapper/PaginationMapperService';

const container: Container = new Container();

container.bind<DBConnectionManager>(TYPES.DBConnectionManager).to(DBConnectionManagerTypeORM).inSingletonScope();
container.bind<BaseMapper<Couple, CoupleDto>>(TYPES.CoupleMapper).to(CoupleMapper);
container.bind<BaseMapper<PaginationMapperParams<Array<CoupleDto>>, PaginationResponseDTO<Array<CoupleDto>>>>(TYPES.PaginationMapperService).to(PaginationMapperService);
container.bind<Adapter<PaginationQueryDTO, Promise<PaginationResponseDTO<Couple>>>>(TYPES.ApiGatewayGetAdapter).to(ApiGatewayGetAdapter);
container.bind<UseCase<PaginationQueryDTO, Promise<{items: Couple[], count: number}>>>(TYPES.ApiGatewayGetUseCase).to(ApiGatewayGetUseCase);

export default container