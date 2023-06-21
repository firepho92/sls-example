import { Container } from 'inversify';
import TYPES from '../../../../../src/TYPES';
import APIGatewayProxyEventBaseHandler from '../../../../../src/modules/common/app/APIGatewayProxyEventBaseHandler';
import Handler from '../../../../../src/modules/common/app/Handler';
import Adapter from '../../../../../src/modules/common/adapter/Adapter';
import UseCase from '../../../../../src/modules/common/useCase/UseCase';
import ApiGatewayHandler1_0_0 from '../../../../../src/modules/apiGateway/app/ApiGatewayHandler1_0_0';
import ApiGatewayHandler1_0_1 from '../../../../../src/modules/apiGateway/app/ApiGatewayHandler1_0_1';
import ApiGatewayPostAdapter from '../../../../../src/modules/apiGateway/adapter/ApiGatewayPostAdapter';
import ApiGatewayPostUseCase from '../../../../../src/modules/apiGateway/useCase/ApiGatewayPostUseCase';
import ApiGatewayPostAdapterParams from '../../../../../src/modules/apiGateway/adapter/ApiGatewayPostAdapterParams';
import ApiGatewayPostUseCaseParams from '../../../../../src/modules/apiGateway/useCase/ApiGatewayPostUseCaseParams';
import Couple from '../../../../../src/modules/apiGateway/domain/entity/Couple';
import CoupleDto from '../../../../../src/modules/apiGateway/domain/dto/CoupleDto';
import BaseMapper from '../../../../../src/modules/common/domain/mapper/BaseMapper';
import CoupleMapper from '../../../../../src/modules/apiGateway/domain/mapper/CoupleMapper';
import CreateBaseRepository from '../../../../../src/modules/common/domain/repository/CreateBaseRepository';
import CoupleCreateOneRepository from '../../../../../src/modules/apiGateway/domain/repository/CoupleCreateOneRepository';
import PersonCreateOneRepository from '../../../../../src/modules/apiGateway/domain/repository/PersonCreateOneRepository';
import Person from '../../../../../src/modules/apiGateway/domain/entity/Person';
import DBConnectionManager from '../../../../../src/utils/database/DBConnectionManager';
import DBConnectionManagerTypeORM from '../../../../../src/utils/database/DBConnectionManagerTypeORM';

const container: Container = new Container();

container.bind<APIGatewayProxyEventBaseHandler<Promise<CoupleDto>>>(TYPES.Default).to(ApiGatewayHandler1_0_0);
container.bind<Handler<Promise<any>>>(TYPES['1.0.0']).to(ApiGatewayHandler1_0_0);
container.bind<Handler<Promise<any>>>(TYPES['1.0.1']).to(ApiGatewayHandler1_0_1);
container.bind<DBConnectionManager>(TYPES.DBConnectionManager).to(DBConnectionManagerTypeORM).inSingletonScope();
container.bind<Adapter<ApiGatewayPostAdapterParams, Promise<CoupleDto>>>(TYPES.ApiGatewayPostAdapter).to(ApiGatewayPostAdapter);
container.bind<UseCase<ApiGatewayPostUseCaseParams, Promise<ApiGatewayPostUseCaseParams>>>(TYPES.ApiGatewayPostUseCase).to(ApiGatewayPostUseCase);
container.bind<BaseMapper<Couple, CoupleDto>>(TYPES.CoupleMapper).to(CoupleMapper);
container.bind<CreateBaseRepository<Couple>>(TYPES.CoupleCreateOneRepository).to(CoupleCreateOneRepository);
container.bind<CreateBaseRepository<Person>>(TYPES.PersonCreateOneRepository).to(PersonCreateOneRepository);

export default container;