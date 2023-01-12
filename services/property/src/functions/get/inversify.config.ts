import { Container } from 'inversify';
import PropertyGetAdapter from 'src/modules/property/adapter/PropertyGetAdapter';
import PropertyFindRepository from 'src/modules/property/domain/repositories/PropertyFindRepository';
import PropertyGetUseCase from 'src/modules/property/useCase/PropertyGetUseCase';
import TYPES from 'src/TYPES';
import DBConnectionManagerTypeORM from 'src/utils/database/DBConnectionManagerTypeORM';

const container = new Container();

container.bind(TYPES.DBConnectionManagerTypeORM).to(DBConnectionManagerTypeORM).inSingletonScope();
container.bind(TYPES.PropertyGetAdapter).to(PropertyGetAdapter);
container.bind(TYPES.PropertyGetUseCase).to(PropertyGetUseCase);
container.bind(TYPES.PropertyFindRepository).to(PropertyFindRepository);

export default container;